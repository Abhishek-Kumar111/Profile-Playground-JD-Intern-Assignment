import React, { useEffect, useState } from 'react';
import './home.css';

// Adjust this if your backend runs on a different port
const API_BASE = 'http://localhost:8000/api';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [work, setWork] = useState([]);
  const [skills, setSkills] = useState([]);
  const [topSkills, setTopSkills] = useState([]);

  const [skillFilter, setSkillFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async (skillQuery) => {
    try {
      setLoading(true);
      setError('');

      const projectsUrl = skillQuery
        ? `${API_BASE}/projects?skill=${encodeURIComponent(skillQuery)}`
        : `${API_BASE}/projects`;

      const [profileRes, projectsRes, workRes, skillsRes, topSkillsRes] =
        await Promise.all([
          fetch(`${API_BASE}/profile`),
          fetch(projectsUrl),
          fetch(`${API_BASE}/work`),
          fetch(`${API_BASE}/skills`),
          fetch(`${API_BASE}/skills/top`),
        ]);

      if (!profileRes.ok && profileRes.status !== 404) {
        throw new Error('Failed to load profile');
      }

      const profileData =
        profileRes.status === 404 ? null : await profileRes.json();

      setProfile(profileData);
      setProjects(await projectsRes.json());
      setWork(await workRes.json());
      setSkills(await skillsRes.json());
      setTopSkills(await topSkillsRes.json());
    } catch (err) {
      setError(err.message || 'Something went wrong while loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll('');
  }, []);

  const handleApplyFilter = () => {
    fetchAll(skillFilter.trim());
  };

  return (
    <div className="home">
      <h1 className="home-title">JD Assignment API Dashboard</h1>
      <p className="home-subtitle">
        This simple page calls Node.js + MongoDB backend APIs and displays
        the raw data.
      </p>

      {error && <div className="home-error">Error: {error}</div>}
      {loading && <div className="home-loading">Loading data...</div>}

      <section className="home-section">
        <h2 className="section-title">Profile (`GET /api/profile`)</h2>
        {profile ? (
          <div className="card">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            {profile.phone && (
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
            )}
            {profile.bio && (
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
            )}
            {profile.location && (
              <p>
                <strong>Location:</strong> {profile.location}
              </p>
            )}
            {profile.links && (
              <p>
                <strong>Links:</strong>{' '}
                {profile.links.github && (
                  <a href={profile.links.github} target="_blank">
                    GitHub
                  </a>
                )}{' '}
                {profile.links.linkedin && (
                  <a href={profile.links.linkedin} target="_blank">
                    LinkedIn
                  </a>
                )}
              </p>
            )}
            {Array.isArray(profile.education) &&
              profile.education.length > 0 && (
                <div className="education-list">
                  <strong>Education:</strong>
                  {profile.education.map((ed, idx) => (
                    <div key={idx} className="education-item">
                      <span>{ed.degree}</span> at <span>{ed.college}</span> (
                      {ed.year}) - {ed.grade}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ) : (
          <p className="muted">
            No profile found yet. Use `POST /api/profile` to create one.
          </p>
        )}
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">
            Projects (`GET /api/projects?skill=x`)
          </h2>
          <div className="filter-row">
            <input
              type="text"
              placeholder="Filter by skill (e.g. react)"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
            <button onClick={handleApplyFilter}>Apply Filter</button>
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="muted">
            No projects found. Use `POST /api/projects` to add projects.
          </p>
        ) : (
          <div className="grid">
            {projects.map((p) => (
              <div key={p._id} className="card">
                <h3>{p.title}</h3>
                {p.description && <p>{p.description}</p>}
                {Array.isArray(p.skills) && p.skills.length > 0 && (
                  <p className="tag-row">
                    {p.skills.map((s, idx) => (
                      <span key={idx} className="tag">
                        {s}
                      </span>
                    ))}
                  </p>
                )}
                <p className="links-row">
                  {p.github && (
                    <a href={p.github} target="_blank">
                      GitHub
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank">
                      Live
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="home-section">
        <h2 className="section-title">Work (`GET /api/work`)</h2>
        {work.length === 0 ? (
          <p className="muted">
            No work items found. Use `POST /api/work` to add experience.
          </p>
        ) : (
          <div className="grid">
            {work.map((w) => (
              <div key={w._id} className="card">
                <h3>{w.role}</h3>
                <p>
                  <strong>Company:</strong> {w.company}
                </p>
                {w.duration && (
                  <p>
                    <strong>Duration:</strong> {w.duration}
                  </p>
                )}
                {w.description && <p>{w.description}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="home-section two-column">
        <div>
          <h2 className="section-title">Skills (`GET /api/skills`)</h2>
          {skills.length === 0 ? (
            <p className="muted">
              No skills found. Use `POST /api/skills` to add skills.
            </p>
          ) : (
            <ul className="list">
              {skills.map((s) => (
                <li key={s._id}>{s.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="section-title">Top Skills (`GET /api/skills/top`)</h2>
          {topSkills.length === 0 ? (
            <p className="muted">
              No top skills yet. Add projects with `skills: []` first.
            </p>
          ) : (
            <ul className="list">
              {topSkills.map((s, idx) => (
                <li key={idx}>
                  {s.name} <span className="muted">({s.count} projects)</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;