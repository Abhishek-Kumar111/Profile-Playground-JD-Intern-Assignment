import React from 'react';
import Profile from '../../Components/Profile/Profile';
import Projects from '../../Components/Projects/Projects';
import Work from '../../Components/Work/Work';
import Skills from '../../Components/Skills/Skills';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">JD Assignment - Full CRUD Dashboard</h1>
      <p className="home-subtitle">
        Manage Profile, Projects, Work Experience, and Skills with full
        Create, Read, Update, and Delete operations.
      </p>

      <Profile />
      <Projects />
      <Work />
      <Skills />
    </div>
  );
};

export default Home;