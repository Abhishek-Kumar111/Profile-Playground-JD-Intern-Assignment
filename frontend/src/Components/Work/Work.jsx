import React, { useState, useEffect } from 'react';
import { workAPI } from '../../services/api';
import './Work.css';

const Work = () => {
  const [workList, setWorkList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    duration: '',
    description: '',
  });

  useEffect(() => {
    fetchWork();
  }, []);

  const fetchWork = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await workAPI.getAll();
      setWorkList(response.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load work experience');
    } finally {
      setLoading(false);
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
      if (editingId) {
        await workAPI.update(editingId, formData);
      } else {
        await workAPI.create(formData);
      }
      resetForm();
      fetchWork();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save work experience');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (work) => {
    setFormData({
      company: work.company || '',
      role: work.role || '',
      duration: work.duration || '',
      description: work.description || '',
    });
    setEditingId(work._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
      try {
        setLoading(true);
        setError('');
        await workAPI.delete(id);
        fetchWork();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete work experience');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      duration: '',
      description: '',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="work-container">
      <div className="section-header">
        <h2>Work Experience</h2>
        <button onClick={() => setIsFormOpen(true)} className="btn-primary">
          Add Work Experience
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="form">
          <h3>{editingId ? 'Edit Work Experience' : 'Add New Work Experience'}</h3>
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g. Jan 2020 - Dec 2022"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update Work' : 'Add Work'}
            </button>
            <button type="button" onClick={resetForm} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && !isFormOpen ? (
        <div className="loading">Loading work experience...</div>
      ) : workList.length === 0 ? (
        <p className="muted">No work experience found. Add your first work experience above.</p>
      ) : (
        <div className="work-list">
          {workList.map((work) => (
            <div key={work._id} className="work-card">
              <h3>{work.role}</h3>
              <p><strong>Company:</strong> {work.company}</p>
              {work.duration && <p><strong>Duration:</strong> {work.duration}</p>}
              {work.description && <p>{work.description}</p>}
              <div className="work-actions">
                <button onClick={() => handleEdit(work)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(work._id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Work;
