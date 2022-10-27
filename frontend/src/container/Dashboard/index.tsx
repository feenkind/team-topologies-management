import * as React from 'react';
import Layout from '../../components/Layout';
import { Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Layout activeSidebarMenuItem="dashboard" activeHeaderMenuItem="overview">
      <Typography variant="body2" component="div">
        test
      </Typography>
    </Layout>
  );
};

export default Dashboard;
