import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { api } from "../api/api";

interface Profile {
  f_name: string;
  l_name: string;
  phone: string;
  gender: string;
  date_of_birth: string;
}


interface ProfileContextType {
  profile: Profile | null;
  profileExists: boolean;
  fetchProfile(): void;
  createProfile(profileData: Profile): void;
  updateProfile(profileData: Profile): void;
}


const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

function ProfileProvider(props: ProfileProviderProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileExists, setProfileExists] = useState(false);

  const fetchProfile = useCallback(async function () {
    try {
      const response = await api.get('/profile');
      console.log('Profile fetched:', response.data);
      setProfile(response.data);
      setProfileExists(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfileExists(false);
    }
  }, []);

  async function createProfile(profileData: Profile) {
    try {
      await api.post('/profile', profileData);
      console.log('Profile created:', profileData);
      setProfile(profileData);
      setProfileExists(true);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  }

  async function updateProfile(profileData: Profile) {
    try {
      await api.put('/profile', profileData);
      console.log('Profile updated:', profileData);
      setProfile(profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, profileExists, fetchProfile, createProfile, updateProfile }}>
      {props.children}
    </ProfileContext.Provider>
  );
}

function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export { ProfileProvider, useProfile };
