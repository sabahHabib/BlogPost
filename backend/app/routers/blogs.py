from fastapi import Depends, status,APIRouter

from .models.blogs import Blog
from .. import schemas
from ..auth.auth_dependencies import get_current_user
from typing import List
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix='/blog', tags=["blogs"])


@router.get("/", response_model=List[schemas.Blog])
def get_all(db: Session = Depends(get_db)):
    blogs = Blog(db)
    return blogs.get_blog()


@router.post('/', status_code=status.HTTP_201_CREATED)
def create(request: schemas.BlogCreate, db: Session = Depends(get_db),
           current_user: schemas.User = Depends(get_current_user)):
    new_blog = Blog(db)
    return new_blog.save_blog(request.title, request.body, current_user.id)


@router.get("/{id}", status_code=200, response_model=schemas.Blog)
def show(id, db: Session = Depends(get_db)):
    blog = Blog(db)
    return blog.get_blog_id(id)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update(id, request: schemas.BlogCreate, db: Session = Depends(get_db),
           current_user: schemas.User = Depends(get_current_user)):
    blog = Blog(db)
    return blog.update_blog(id, request.title, request.body, current_user.id)


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id, db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    blog = Blog(db)
    return blog.delete_blog(id, current_user.id)
