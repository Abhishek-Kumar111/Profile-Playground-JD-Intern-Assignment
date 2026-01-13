import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [skillFilter, setSkillFilter] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    github: '',
    live: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async (skill = '') => {
    try {
      setLoading(true);
      setError('');
      const response = await projectAPI.getAll(skill);
      setProjects(response.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load projects');
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
      const projectData = {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()).filter((s) => s),
      };

      if (editingId) {
        await projectAPI.update(editingId, projectData);
      } else {
        await projectAPI.create(projectData);
      }

      resetForm();
      fetchProjects(skillFilter);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      skills: Array.isArray(project.skills) ? project.skills.join(', ') : '',
      github: project.github || '',
      live: project.live || '',
    });
    setEditingId(project._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true);
        setError('');
        await projectAPI.delete(id);
        fetchProjects(skillFilter);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete project');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      skills: '',
      github: '',
      live: '',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleFilter = () => {
    fetchProjects(skillFilter.trim());
  };

  return (
    <div className="projects-container">
      <div className="section-header">
        <h2>Projects</h2>
        <button onClick={() => setIsFormOpen(true)} className="btn-primary">
          Add Project
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by skill (e.g. react, node)"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="filter-input"
        />
        <button onClick={handleFilter} className="btn-filter">
          Apply Filter
        </button>
        {skillFilter && (
          <button
            onClick={() => {
              setSkillFilter('');
              fetchProjects('');
            }}
            className="btn-clear"
          >
            Clear Filter
          </button>
        )}
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="form">
          <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
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

          <div className="form-group">
            <label>Skills (comma-separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g. react, node, mongodb"
            />
          </div>

          <div className="form-group">
            <label>GitHub URL</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Live URL</label>
            <input
              type="url"
              name="live"
              value={formData.live}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
            </button>
            <button type="button" onClick={resetForm} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && !isFormOpen ? (
        <div className="loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <p className="muted">No projects found. Add your first project above.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              {project.description && <p>{project.description}</p>}
              {project.skills && project.skills.length > 0 && (
                <div className="tags">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
              <div className="project-actions">
                <button onClick={() => handleEdit(project)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(project._id)} className="btn-delete">
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

export default Projects;
