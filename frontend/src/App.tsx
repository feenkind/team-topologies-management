import React from 'react';
import Dashboard from './container/Dashboard';
import ProjectList from './container/ProjectList';
import Layout from './components/Layout';
import ProjectOverview from './container/Project/ProjectOverview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeamList from './container/TeamList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="project/:id" element={<ProjectOverview />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="teams" element={<TeamList />} />
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
