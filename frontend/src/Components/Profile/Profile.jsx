import React, { useState, useEffect } from 'react';
import { profileAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    links: {
      github: '',
      linkedin: '',
    },
    education: [],
  });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    college: '',
    year: '',
    grade: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await profileAPI.get();
      if (response.data) {
        setProfile(response.data);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          bio: response.data.bio || '',
          location: response.data.location || '',
          links: {
            github: response.data.links?.github || '',
            linkedin: response.data.links?.linkedin || '',
          },
          education: response.data.education || [],
        });
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        setError(err.response?.data?.error || 'Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('links.')) {
      const linkKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        links: {
          ...prev.links,
          [linkKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.college) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, { ...newEducation }],
      }));
      setNewEducation({ degree: '', college: '', year: '', grade: '' });
    }
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      if (profile) {
        await profileAPI.update(formData);
      } else {
        await profileAPI.create(formData);
      }
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="section-header">
        <h2>Profile</h2>
        {isAuthenticated && profile && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Edit Profile
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {!profile && !isEditing ? (
        <div>
          <p className="muted">No profile found.</p>
          {isAuthenticated ? (
            <button onClick={() => setIsEditing(true)} className="btn-primary">
              Create Profile
            </button>
          ) : (
            <p className="muted">Please <a href="/login">login</a> to create or edit profile.</p>
          )}
        </div>
      ) : isEditing || (!profile && isAuthenticated) ? (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>GitHub URL</label>
            <input
              type="url"
              name="links.github"
              value={formData.links.github}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn URL</label>
            <input
              type="url"
              name="links.linkedin"
              value={formData.links.linkedin}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Education</label>
            <div className="education-form">
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={newEducation.degree}
                onChange={handleEducationChange}
              />
              <input
                type="text"
                name="college"
                placeholder="College"
                value={newEducation.college}
                onChange={handleEducationChange}
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={newEducation.year}
                onChange={handleEducationChange}
              />
              <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={newEducation.grade}
                onChange={handleEducationChange}
              />
              <button type="button" onClick={addEducation} className="btn-add">
                Add Education
              </button>
            </div>
            {formData.education.map((ed, idx) => (
              <div key={idx} className="education-item">
                <span>
                  {ed.degree} at {ed.college} ({ed.year}) - {ed.grade}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(idx)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
            </button>
            {profile && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile();
                }}
                className="btn-cancel"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="profile-display">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
          {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
          {profile.location && <p><strong>Location:</strong> {profile.location}</p>}
          {profile.links && (
            <p>
              <strong>Links:</strong>{' '}
              {profile.links.github && (
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}{' '}
              {profile.links.linkedin && (
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
            </p>
          )}
          {profile.education && profile.education.length > 0 && (
            <div>
              <strong>Education:</strong>
              {profile.education.map((ed, idx) => (
                <div key={idx} className="education-item">
                  {ed.degree} at {ed.college} ({ed.year}) - {ed.grade}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
