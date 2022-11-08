import React from 'react';
import Dashboard from './container/Dashboard';
import ProjectList from './container/Project/ProjectList';
import Layout from './components/Layout/Layout';
import ProjectOverview from './container/Project/ProjectOverview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeamList from './container/Team/TeamList';
import Header from './container/Header';
import Sidebar from './container/Sidebar';
import Visualization from './container/Visualization/Visualization';
import DomainListForProject from './container/Domain/DomainListForProject';
import TeamListForProject from './container/Team/TeamListForProject';
import DomainAddForm from './container/Domain/DomainAddForm';
import TeamAddToProject from './container/Team/TeamAddToProject';
import DomainView from './container/Domain/DomainView';
import Page404 from './components/Page404';
import TeamView from './container/Team/TeamView';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout header={<Header />} sidebar={<Sidebar />} />}>
          <Route
            path="project/:projectId/team/add"
            element={<TeamAddToProject />}
          />
          <Route
            path="project/:projectId/teams"
            element={<TeamListForProject />}
          />
          <Route
            path="project/:projectId/domain/:domainId"
            element={<DomainView />}
          />
          <Route
            path="project/:projectId/domain/add"
            element={<DomainAddForm />}
          />
          <Route
            path="project/:projectId/domains"
            element={<DomainListForProject />}
          />
          <Route
            path="project/:projectId/visualization"
            element={<Visualization />}
          />
          <Route path="project/:projectId" element={<ProjectOverview />} />
          <Route path="/team/:teamId" element={<TeamView />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="teams" element={<TeamList />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
