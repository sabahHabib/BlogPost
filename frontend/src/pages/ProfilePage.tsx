import React, { useState, useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { FaUserEdit, FaSave } from 'react-icons/fa';

function ProfilePage() {
  const { profile, profileExists, fetchProfile, createProfile, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    phone: '',
    gender: '',
    date_of_birth: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(function () {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(function () {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData(function (prevData) {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (profileExists) {
      await updateProfile(formData);
      alert('Profile updated successfully!');
      setIsEditing(false);
    } else {
      await createProfile(formData);
      alert('Profile created successfully!');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">
              {profileExists ? (isEditing ? 'Edit Profile' : 'My Profile') : 'Create Your Profile'}
            </h2>

            {profileExists && !isEditing ? (
              <div>
                <p><strong>First Name:</strong> {profile?.f_name}</p>
                <p><strong>Last Name:</strong> {profile?.l_name}</p>
                <p><strong>Phone:</strong> {profile?.phone}</p>
                <p><strong>Gender:</strong> {profile?.gender}</p>
                <p><strong>Date of Birth:</strong> {profile?.date_of_birth}</p>
                <button
                  className="btn btn-outline-primary mt-3 w-100"
                  onClick={() => setIsEditing(true)}
                >
                  <FaUserEdit /> Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="f_name"
                    value={formData.f_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="l_name"
                    value={formData.l_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Enter your gender"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-3">
                  <FaSave /> {profileExists ? 'Update Profile' : 'Create Profile'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;