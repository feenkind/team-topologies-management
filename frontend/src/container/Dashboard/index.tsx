import * as React from 'react';
import Layout from '../../components/Layout';
import { Typography } from '@mui/material';
import { sidebarMenuItems } from '../../constants/navItems';
import { useAppSelector } from '../../hooks';

const Dashboard: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  return (
    <Layout activeSidebarMenuItem={sidebarMenuItems.OVERVIEW}>
      <Typography variant="body2" component="div">
        Hello, welcome to your project:
      </Typography>
      {currentProject}
    </Layout>
  );
};

export default Dashboard;
