# backend/app/api/v1/tasks.py
from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.task import TaskCreate, TaskOut, TaskUpdate
from app.services.task_service import (
    create_task,
    delete_task,
    get_task_by_id,
    list_tasks,
    update_task,
)

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
async def create_task_route(
    task_in: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TaskOut:
    return await create_task(db, task_in, current_user.id)


@router.get("/", response_model=list[TaskOut])
async def list_tasks_route(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[TaskOut]:
    return await list_tasks(db, current_user)


@router.get("/{task_id}", response_model=TaskOut)
async def get_task_route(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TaskOut:
    return await get_task_by_id(db, task_id, current_user)


@router.put("/{task_id}", response_model=TaskOut)
async def update_task_route(
    task_id: UUID,
    task_in: TaskUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TaskOut:
    return await update_task(db, task_id, task_in, current_user)


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task_route(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    await delete_task(db, task_id, current_user)
    return None