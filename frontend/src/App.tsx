import React from 'react';
import Dashboard from './container/Dashboard/Dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectList from './container/Projects/ProjectList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/projects',
    element: <ProjectList />,
  },
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
