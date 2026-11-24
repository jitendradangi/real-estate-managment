# FastAPI application entrypoint.

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

# Importing the models package registers all tables on Base.metadata.
from app import models  # noqa: F401
from app.database import Base, engine
from app.routers import inquiries, properties
from app.seed import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup/shutdown lifecycle.

    Creates tables if they do not exist (idempotent; never drops data) and
    seeds sample data idempotently.
    """
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield


app = FastAPI(
    title="Real Estate Management API",
    description="Backend API for the Real Estate Management application.",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS configuration to allow the React frontend (Vite dev server) to call the API.
# allow_origin_regex permits any localhost port so the dev server works
# regardless of which port Vite selects.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_origin_regex=r"http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers.
app.include_router(properties.router)
app.include_router(inquiries.router)


@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    """Return a clean 500 response for database errors."""
    return JSONResponse(
        status_code=500,
        content={"detail": "A database error occurred"},
    )


@app.get("/")
def read_root():
    return {"message": "Real Estate Management API is running"}
