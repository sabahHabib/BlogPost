from fastapi import FastAPI
from . import models
from .database import engine
from fastapi.middleware.cors import CORSMiddleware
from .routers import blogs, signup, login,profile

app = FastAPI()
models.Base.metadata.create_all(engine)

app.include_router(login.router)
app.include_router(blogs.router)
app.include_router(signup.router)
app.include_router(profile.router)

origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
