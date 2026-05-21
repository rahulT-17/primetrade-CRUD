from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.core.security import hash_password, verify_password
from app.models.user import User
from app.schemas.user import UserCreate


async def register_user(db: AsyncSession, user_in: UserCreate) -> User:
    result = await db.execute(
        select(User).where(or_(User.email == user_in.email, User.username == user_in.username))
    )
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email or username already registered",
        )

    print("password_bytes_len:", len(user_in.password.encode("utf-8")))
    
    user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=hash_password(user_in.password),
        role="user",
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def authenticate_user(db: AsyncSession, email: str, password: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user