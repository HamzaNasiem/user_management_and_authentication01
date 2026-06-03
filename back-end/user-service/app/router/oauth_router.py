# router/oauth_router.py
from urllib import response
from fastapi import APIRouter, HTTPException, Depends
from jose import jwt
from app.utils.auth import oauth2_scheme, create_access_token, hash_password
import requests
from app.settings import (
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
)
from sqlmodel import Session, select
from app.database import get_session
from app.models.user import User, UserType
from app.models.auth_token import AuthToken, AuthTokenType
from uuid import uuid4
from datetime import datetime, timedelta

oauth_router = APIRouter()

@oauth_router.get("/login/google")
async def login_google():
    return {
        "url": f"https://accounts.google.com/o/oauth2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&access_type=offline"
    }


@oauth_router.get("/auth/google")
async def auth_google(code: str, session: Session = Depends(get_session)):
    token_url = "https://accounts.google.com/o/oauth2/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code"
    }
    response = requests.post(token_url, data=data)

    if response.status_code != 200:
        print(response.text)
        raise HTTPException(status_code=response.status_code, detail=response.json())

    access_token = response.json().get("access_token")
    user_info_res = requests.get("https://www.googleapis.com/oauth2/v1/userinfo",
                             headers={"Authorization": f"Bearer {access_token}"})
    
    if user_info_res.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch user info from Google")
        
    google_user = user_info_res.json()
    email = google_user.get("email")
    name = google_user.get("name", "Google User")
    google_id = google_user.get("id")

    if not email:
        raise HTTPException(status_code=400, detail="Google account has no email associated")

    # Find or create user
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        user = User(
            full_name=name,
            email=email,
            phone=f"google_{google_id}" if google_id else f"google_{uuid4().hex[:10]}",
            affiliation="Google OAuth",
            is_verified=True,
            password=hash_password(str(uuid4())),
            user_type=UserType.VISITOR
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    elif not user.is_verified:
        user.is_verified = True
        session.add(user)
        session.commit()
        session.refresh(user)

    # Issue our local JWT token
    our_access_token = create_access_token(data={"sub": user.email})
    
    # Store token in DB
    token_record = AuthToken(
        user_id=user.id,
        token_value=our_access_token,
        token_type=AuthTokenType.ACCESS_TOKEN,
        expires_at=datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    session.add(token_record)
    session.commit()

    return {"access_token": our_access_token, "token_type": "bearer"}


@oauth_router.get("/token")
async def get_token(authorization: str = Depends(oauth2_scheme)):
    if authorization is None:
        raise HTTPException(
            status_code=403, detail="Authorization header missing")

    token = authorization.split(" ")[1]  

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.JWTError:
        raise HTTPException(
            status_code=403, detail="Could not validate credentials")
