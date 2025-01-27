from fastapi import HTTPException
from sqlalchemy.orm import Session

from ... import models
from ..services import hashing


class User:
    def __init__(self, db: Session):
        self.db = db

    def save_user(self, name, email, password):
        new_user = self.db.query(models.User).filter(models.User.email == email).first()
        if new_user:
            raise HTTPException(status_code=400,
                                detail="User with this Email already Exist please Login or try another "
                                       "Email")
        new_user = models.User(name=name, email=email, password=hashing.Hash.bcrypt(password))
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return new_user
