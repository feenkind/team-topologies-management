import React from 'react';
import Dashboard from './container/Dashboard';
import ProjectList from './container/Project/ProjectList';
import Layout from './components/Layout/Layout';
import ProjectOverview from './container/Project/ProjectOverview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeamList from './container/Team/TeamList';
import Header from './container/Header/Header';
import Sidebar from './container/Sidebar';
import Visualization from './container/Visualization/Visualization';
import DomainListForProject from './container/Domain/DomainListForProject';
import TeamListForProject from './container/Team/TeamListForProject';
import DomainView from './container/Domain/DomainView';
import Page404 from './components/Page404';
import TeamView from './container/Team/TeamView';
import NotificationList from './container/Notification/NotificationList';
import DataLoader from './container/DataLoader';
import ProjectNotFound from './container/Project/ProjectNotFound';
import TeamAddForm from './container/Team/TeamAddForm';
import DomainForm from './container/Domain/DomainForm';
import TeamEditForm from './container/Team/TeamEditForm';
import ProjectForm from './container/Project/ProjectForm';
import ErrorDisplay from './container/ErrorDisplay';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <DataLoader>
              <Layout
                header={<Header />}
                sidebar={<Sidebar />}
                errorDisplay={<ErrorDisplay />}
              />
            </DataLoader>
          }
        >
          <Route
            path="project/:projectId/team/:teamId/edit"
            element={<TeamEditForm />}
          />
          <Route
            path="project/:projectId/team/:teamId"
            element={<TeamView />}
          />
          <Route path="project/:projectId/team/add" element={<TeamAddForm />} />
          <Route
            path="project/:projectId/teams"
            element={<TeamListForProject />}
          />

          <Route
            path="project/:projectId/domain/:domainId/edit"
            element={<DomainForm />}
          />
          <Route
            path="project/:projectId/domain/:domainId"
            element={<DomainView />}
          />
          <Route
            path="project/:projectId/domain/add"
            element={<DomainForm />}
          />
          <Route
            path="project/:projectId/domains"
            element={<DomainListForProject />}
          />
          <Route
            path="project/:projectId/visualization"
            element={<Visualization />}
          />
          <Route path="project/:projectId/edit" element={<ProjectForm />} />
          <Route path="project/:projectId" element={<ProjectOverview />} />
          <Route path="notifications" element={<NotificationList />} />
          <Route path="projects/add" element={<ProjectForm />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="teams" element={<TeamList />} />
          <Route path="project-not-found" element={<ProjectNotFound />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
