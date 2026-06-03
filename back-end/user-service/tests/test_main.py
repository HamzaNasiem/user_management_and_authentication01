from fastapi.testclient import TestClient
from sqlmodel import Session, select
from app.main import app
from app.database import get_session
from app.models.user import User, UserRead, UserType
from app.models.verification_token import VerificationToken
from app.models.auth_token import AuthToken

def test_read_root() -> None:
    client = TestClient(app=app)
    response = client.get("/")
    assert response.status_code == 200
    assert "authentication service" in response.json()["message"]

def test_full_auth_flow(client: TestClient, session: Session) -> None:
    # 1. Register a student user
    register_payload = {
        "full_name": "Test Student",
        "email": "student@panaversity.org",
        "phone": "03001234567",
        "affiliation": "Panaversity",
        "password": "securepassword123",
        "user_type": "student"
    }
    
    response = client.post("/api/v1/user/register", json=register_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "student@panaversity.org"
    assert data["is_verified"] is False
    user_id = data["id"]

    # Verify user was created in the DB
    user_db = session.exec(select(User).where(User.id == user_id)).first()
    assert user_db is not None
    assert user_db.is_verified is False

    # 2. Attempt login before email verification (should fail with 401)
    login_payload = {
        "username": "student@panaversity.org",
        "password": "securepassword123"
    }
    response = client.post("/api/v1/user/login", data=login_payload)
    assert response.status_code == 401
    assert "not verified" in response.json()["detail"]

    # 3. Simulate email verification by fetching the token from DB
    ver_token = session.exec(select(VerificationToken).where(VerificationToken.user_id == user_id)).first()
    assert ver_token is not None
    
    # Hit the verification endpoint
    response = client.get(f"/api/v1/user/verify?token={ver_token.hash_id}")
    assert response.status_code == 200
    assert "verified successfully" in response.json()["message"]

    # Verify user state is updated in DB
    session.refresh(user_db)
    assert user_db.is_verified is True

    # 4. Attempt login after verification (should succeed)
    response = client.post("/api/v1/user/login", data=login_payload)
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    access_token = token_data["access_token"]

    # 5. Fetch profile using access token
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get("/api/v1/user/profile", headers=headers)
    assert response.status_code == 200
    profile = response.json()
    assert profile["email"] == "student@panaversity.org"

    # 6. Logout and invalidate token
    response = client.post(f"/api/v1/user/logout?access_token={access_token}")
    assert response.status_code == 200

    # 7. Try fetching profile again with the logged-out token (should fail)
    response = client.get("/api/v1/user/profile", headers=headers)
    assert response.status_code == 401