"""App factory and basic health check."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import app.models
from app.api.v1.router import api_router
from app.middleware.error_handler import register_exception_handlers


def create_app() -> FastAPI:
    app = FastAPI(title="PrimeTrade API")
    register_exception_handlers(app)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],  # In production, specify allowed origins
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(api_router)

    @app.get("/health")
    async def health():
        return {"status": "backend is working"}

    return app


app = create_app()