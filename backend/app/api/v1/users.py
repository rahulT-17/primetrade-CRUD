# backend/app/api/v1/users.py
from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import require_admin
from app.db.session import get_db
from app.schemas.user import UserOut
from app.services.user_service import delete_user, list_users

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[UserOut])
async def list_users_route(
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
) -> list[UserOut]:
    return await list_users(db)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_route(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
) -> None:
    await delete_user(db, user_id)
    return None