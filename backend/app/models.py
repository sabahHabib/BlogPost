from sqlalchemy import Column, Integer, String, ForeignKey, Date
from .database import Base
from sqlalchemy.orm import relationship


class Blog(Base):
    __tablename__ = 'blogs'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    body = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    creator = relationship('User', back_populates='blogs')


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, nullable=False,unique=True)
    password = Column(String, nullable=False)

    blogs = relationship('Blog', back_populates='creator')
    profile = relationship('UserProfile', back_populates='user', uselist=False)


class UserProfile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    f_name = Column(String, nullable=True)
    l_name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    date_of_birth = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False,index=True)

    user = relationship('User', back_populates='profile')
