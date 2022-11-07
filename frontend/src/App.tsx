import React from 'react';
import Dashboard from './container/Dashboard';
import ProjectList from './container/ProjectList';
import Layout from './components/Layout';
import ProjectOverview from './container/Project/ProjectOverview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeamList from './container/TeamList';
import Header from './container/Header';
import Sidebar from './container/Sidebar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout header={<Header />} sidebar={<Sidebar />} />}>
          <Route path="project/:projectId" element={<ProjectOverview />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="teams" element={<TeamList />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
