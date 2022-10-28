import * as React from 'react';
import Layout from '../../components/Layout';
import { Typography } from '@mui/material';
import { sidebarMenuItems } from '../../constants/navItems';

const Dashboard: React.FC = () => {
  return (
    <Layout
      activeSidebarMenuItem={sidebarMenuItems.OVERVIEW}
      activeHeaderMenuItem={sidebarMenuItems.OVERVIEW}
    >
      <Typography variant="body2" component="div">
        Hello there :)
      </Typography>
    </Layout>
  );
};

export default Dashboard;
