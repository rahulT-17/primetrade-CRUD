# backend/app/services/task_service.py
from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate, TaskUpdate


async def create_task(db: AsyncSession, task_in: TaskCreate, owner_id: UUID) -> Task:
    task = Task(
        title=task_in.title,
        description=task_in.description,
        owner_id=owner_id,
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


async def list_tasks(db: AsyncSession, current_user: User) -> list[Task]:
    stmt = select(Task).order_by(Task.created_at.desc())
    if current_user.role != "admin":
        stmt = stmt.where(Task.owner_id == current_user.id)
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_task_by_id(db: AsyncSession, task_id: UUID, current_user: User) -> Task:
    task = await _get_task_or_404(db, task_id)
    _ensure_access(task, current_user)
    return task


async def update_task(db: AsyncSession, task_id: UUID, task_in: TaskUpdate, current_user: User) -> Task:
    task = await _get_task_or_404(db, task_id)
    _ensure_access(task, current_user)

    data = task_in.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    for key, value in data.items():
        setattr(task, key, value)

    await db.commit()
    await db.refresh(task)
    return task


async def delete_task(db: AsyncSession, task_id: UUID, current_user: User) -> None:
    task = await _get_task_or_404(db, task_id)
    _ensure_access(task, current_user)
    await db.delete(task)
    await db.commit()


async def _get_task_or_404(db: AsyncSession, task_id: UUID) -> Task:
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


def _ensure_access(task: Task, current_user: User) -> None:
    if current_user.role != "admin" and task.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to access this task")