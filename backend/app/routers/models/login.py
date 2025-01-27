from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ... import models
from ...auth.auth_utils import create_access_token
from ...routers.services import hashing


class Verification:
    def __init__(self, db: Session):
        self.db = db

    def verify_user(self,username,password):
        user = self.db.query(models.User).filter(models.User.email == username).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid credentials OR Try to Register First"
            )

        if not hashing.Hash.verify(user.password, password):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Incorrect password"
            )

        access_token = create_access_token(data={"sub": user.email})

        return {"access_token": access_token, "token_type": "bearer"}
