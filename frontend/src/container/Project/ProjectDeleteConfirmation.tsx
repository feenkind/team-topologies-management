import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import PageHeadline from '../../components/Layout/PageHeadline';
import { Alert, Button, Typography } from '@mui/material';
import axiosInstance from '../../axios';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';

const ProjectDeleteConfirmation: React.FC = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const projectToDelete = projects.find((project) => project.id === projectId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!projectToDelete) {
    return <Page404 />;
  }

  const deleteProject = () => {
    axiosInstance
      .delete(`/projects/${projectToDelete.id}`)
      .then(() => {
        // trigger new data loading from backend to refresh all data
        dispatch(setDataLoaded(false));
        // go to projects list after delete
        navigate(`/projects`);
      })
      .catch(() => dispatch(setNetworkError(true)));
  };

  return (
    <>
      <PageHeadline
        text={`Do you really want to delete project ${projectToDelete.name}?`}
      />
      <Alert severity="warning" sx={{ mb: 2 }}>
        This action can not be undone.
      </Alert>
      <Typography variant="body1">
        Please confirm you want to delete project
      </Typography>
      <Typography fontWeight="bold" sx={{ my: 2 }}>
        {projectToDelete.name}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          mt: 3,
          mr: 2,
        }}
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        sx={{
          mt: 3,
        }}
        onClick={deleteProject}
      >
        Delete roject
      </Button>
    </>
  );
};

export default ProjectDeleteConfirmation;
