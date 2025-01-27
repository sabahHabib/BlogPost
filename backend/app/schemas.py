from pydantic import BaseModel
from typing import List, Optional
from datetime import date


class Blog(BaseModel):
    id: int
    title: str
    body: str

    class Config:
        from_attributes = True


class BlogCreate(BaseModel):
    title: str
    body: str

    class Config:
        from_attributes = True


class User(BaseModel):
    name: str
    email: str
    password: str


class ShowUser(BaseModel):
    name: str
    email: str
    blogs: List[Blog] = []

    class Config:
        from_attributes = True


class ShowBlog(BaseModel):
    title: str
    body: str
    creator: ShowUser

    class Config:
        from_attributes = True


class Profile(BaseModel):
    f_name: str
    l_name: str
    phone: str
    gender: str
    date_of_birth: date

    class Config:
        from_attributes = True


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None
