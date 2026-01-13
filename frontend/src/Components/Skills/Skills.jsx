import React, { useState, useEffect } from 'react';
import { skillAPI } from '../../services/api';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    fetchSkills();
    fetchTopSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await skillAPI.getAll();
      setSkills(response.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const fetchTopSkills = async () => {
    try {
      const response = await skillAPI.getTop();
      setTopSkills(response.data || []);
    } catch (err) {
      // Silently fail for top skills
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await skillAPI.create(formData);
      resetForm();
      fetchSkills();
      fetchTopSkills();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        setLoading(true);
        setError('');
        await skillAPI.delete(id);
        fetchSkills();
        fetchTopSkills();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete skill');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
    });
    setIsFormOpen(false);
  };

  return (
    <div className="skills-container">
      <div className="section-header">
        <h2>Skills</h2>
        <button onClick={() => setIsFormOpen(true)} className="btn-primary">
          Add Skill
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="form">
          <h3>Add New Skill</h3>
          <div className="form-group">
            <label>Skill Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Skill'}
            </button>
            <button type="button" onClick={resetForm} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="skills-grid">
        <div className="skills-section">
          <h3>All Skills</h3>
          {loading && !isFormOpen ? (
            <div className="loading">Loading skills...</div>
          ) : skills.length === 0 ? (
            <p className="muted">No skills found. Add your first skill above.</p>
          ) : (
            <div className="skills-list">
              {skills.map((skill) => (
                <div key={skill._id} className="skill-item">
                  <span>{skill.name}</span>
                  <button onClick={() => handleDelete(skill._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="skills-section">
          <h3>Top Skills (by project count)</h3>
          {topSkills.length === 0 ? (
            <p className="muted">No top skills yet. Add projects with skills first.</p>
          ) : (
            <div className="top-skills-list">
              {topSkills.map((skill, idx) => (
                <div key={idx} className="top-skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-count">{skill.count} projects</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
