import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <>
      <Typography variant="body2" component="div" sx={{ my: 5 }}>
        Hello, this is your dashboard. It is still very empty. Please start with
        the project list in the meantime.
      </Typography>
      <Button component={Link} to="/projects" variant="contained">
        Go to project list
      </Button>
    </>
  );
};

export default Dashboard;
