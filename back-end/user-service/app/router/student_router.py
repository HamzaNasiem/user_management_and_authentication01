from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models.user import User, UserRead, UserType
from app.schemas.user import MessageResponse
from app.database import get_session
from app.utils.auth import get_current_user

student_router = APIRouter()


@student_router.post("/profile", response_model=MessageResponse)
async def create_student_profile(profile_data: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    if current_user.user_type != UserType.STUDENT and current_user.user_type != UserType.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized to perform this action")
    
    # Update current user properties with the provided profile data
    for key, value in profile_data.items():
        if hasattr(current_user, key) and key not in ("id", "email", "password", "phone", "user_type", "is_verified"):
            setattr(current_user, key, value)
            
    session.add(current_user)
    session.commit()
    return {"message": "Student profile created successfully."}


@student_router.get("/profile", response_model=UserRead)
async def get_student_profile(student_id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    if current_user.id != student_id and current_user.user_type != UserType.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized to access this student profile")

    student_profile = session.exec(
        select(User).where(User.id == student_id)).first()
    if not student_profile:
        raise HTTPException(
            status_code=404, detail="Student profile not found")
    return student_profile
