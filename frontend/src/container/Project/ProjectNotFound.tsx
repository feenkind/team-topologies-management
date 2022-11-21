import * as React from 'react';
import Page404 from '../../components/Page404';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProjectNotFound: React.FC = () => {
  return (
    <Page404>
      <Typography component="p" variant="body1">
        The project you were looking for could not be found. Please choose
        another project from the sidebar on the left or click on the button
        below.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={`/projects`}
        sx={{
          marginTop: 3,
        }}
      >
        Go to project list
      </Button>
    </Page404>
  );
};

export default ProjectNotFound;
