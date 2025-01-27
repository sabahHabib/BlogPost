from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from ... import models


class Profile:
    def __init__(self, db):
        self.db = db

    def create_profile(self, profile_data: dict, user_id):
        new_profile = self.db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
        if new_profile:
            raise HTTPException(status_code=400,
                                detail="User with this id already Exist.Do you want to update"
                                )
        profile_data['user_id'] = user_id
        new_profile = models.UserProfile(**profile_data)
        self.db.add(new_profile)
        self.db.commit()
        self.db.refresh(new_profile)
        return new_profile

    def get_profile(self, user_id):
        profile = self.db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
        if not profile:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile is not available")
        return profile

    """def update_profile(self, f_name, l_name, phone, gender, date_of_birth, user_id):
        profile = self.db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
        if not profile:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="You haven't created profile yet")
        profile.f_name = f_name
        profile.l_name = l_name
        profile.phone = phone
        profile.gender = gender
        profile.date_of_birth = date_of_birth
        self.db.commit()
        self.db.refresh(profile)

        return profile"""

    def update_profile(self, updates: dict, user_id: int):
        profile = self.db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
        if not profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="You haven't created a profile yet"
            )
        for key, value in updates.items():
            if value is not None:
                setattr(profile, key, value)

        self.db.commit()
        self.db.refresh(profile)

        return profile
