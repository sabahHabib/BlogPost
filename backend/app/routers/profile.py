from fastapi import Depends, status, APIRouter
from sqlalchemy.orm import Session

from .models.profile import Profile
from ..database import get_db
from .. import schemas
from ..auth.auth_dependencies import get_current_user

router = APIRouter(tags=['profile'])


"""@router.post('/profile', status_code=status.HTTP_201_CREATED)
def create_profile(request: schemas.Profile, db: Session = Depends(get_db),
                   current_user: schemas.User = Depends(get_current_user)):
    new_profile = Profile(db)
    return new_profile.create_profile(request.f_name, request.l_name, request.phone, request.gender,
                                      request.date_of_birth, current_user.id)"""


@router.post('/profile', status_code=status.HTTP_201_CREATED, response_model=schemas.Profile)
def create_profile(
        request: schemas.Profile,
        db: Session = Depends(get_db),
        current_user: schemas.User = Depends(get_current_user)
):
    new_profile = Profile(db)
    return new_profile.create_profile(request.dict(), current_user.id)


@router.get('/profile', response_model=schemas.Profile)
def get_profile(db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    profile = Profile(db)
    return profile.get_profile(current_user.id)


@router.put('/profile', response_model=schemas.Profile)
def update_profile(
        request: schemas.Profile,
        db: Session = Depends(get_db),
        current_user: schemas.User = Depends(get_current_user),
):
    updated_profile = Profile(db)
    return updated_profile.update_profile(request.dict(exclude_unset=True), current_user.id)
