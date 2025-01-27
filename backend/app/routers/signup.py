from fastapi import APIRouter, Depends

from .models.users import User
from .. import schemas
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix='/user', tags=["Signup"])


@router.post('/', response_model=schemas.ShowUser)
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    new_user = User(db)
    return new_user.save_user(request.name, request.email, request.password)


"""@router.get("/{id}", response_model=schemas.ShowUser)
def show_user(id, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    user = db.query(models.User).filter(models.User.id ==id,models.User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Not Allowed to get user {id}")
    return user"""
