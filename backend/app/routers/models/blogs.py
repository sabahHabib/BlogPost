from fastapi import HTTPException, status

from ... import models


class Blog:
    def __init__(self, db):
        self.db = db

    def get_blog(self):
        blogs = self.db.query(models.Blog).all()
        # blogs = db.query(models.Blog).filter(models.Blog.user_id==current_user.id).all()
        return blogs

    def save_blog(self, title, body, user_id):
        new_blog = models.Blog(title=title, body=body, user_id=user_id)
        # new_blog = models.Blog(**request.dict(), user_id=current_user.id)
        self.db.add(new_blog)
        self.db.commit()
        self.db.refresh(new_blog)
        return new_blog

    def get_blog_id(self, id):
        blog = self.db.query(models.Blog).filter(models.Blog.id == id).first()
        if not blog:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Blog with the id {id} is not available")
        return blog

    def update_blog(self, id, title, body, user_id):
        blog = self.db.query(models.Blog).filter(models.Blog.id == id).first()

        if not blog:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Blog with id {id} not found."
            )

        if blog.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not authorized to update this blog."
            )

        blog.title = title
        blog.body = body
        self.db.commit()
        self.db.refresh(blog)


        return {"detail": "Blog updated successfully"}

    def delete_blog(self, id, user_id):
        blog = self.db.query(models.Blog).filter(models.Blog.id == id, models.Blog.user_id == user_id)
        if not blog.first():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Blog with id{id} not found")

        blog.delete(synchronize_session=False)
        self.db.commit()
        return 'done'
