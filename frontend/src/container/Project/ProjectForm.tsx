import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { projectHints } from '../../constants/hints';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { useAppDispatch } from '../../hooks';
import { addProject, IProject } from '../../store/slices/projectSlice';
import { useNavigate, useParams } from 'react-router-dom';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import axiosInstance from '../../axios';
import { useEffect, useState } from 'react';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';

interface IProjectFormInput {
  name: string;
  description: string;
}

const ProjectForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const [projectData, setProjectData] = useState<IProject>();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProjectFormInput>();

  useEffect(() => {
    // make sure to always work with the newest data when editing
    if (projectId) {
      axiosInstance
        .get(`/projects/${projectId}`)
        .then((response) => {
          setProjectData(response.data);
          setValue('name', response.data.name);
          setValue('description', response.data.description);
        })
        .catch(() => dispatch(setNetworkError(true)));
    }
  }, [projectId, setProjectData, setValue, dispatch]);

  const onSubmit: SubmitHandler<IProjectFormInput> = (data) => {
    const project = {
      name: data.name,
      description: data.description,
    };

    if (projectData) {
      axiosInstance
        .put(`/projects/${projectData.id}`, project)
        .then(() => {
          // trigger new data loading from backend to refresh all data
          dispatch(setDataLoaded(false));

          // just go back when editing
          navigate(-1);
        })
        .catch(() => dispatch(setNetworkError(true)));
    }

    if (!projectId) {
      axiosInstance
        .post('/projects', project)
        .then((response) => {
          dispatch(addProject({ ...project, id: response.data.id }));

          // go to overview after adding
          navigate(`/project/${response.data.id}`);
        })
        .catch(() => dispatch(setNetworkError(true)));
    }
  };

  return (
    <>
      <PageHeadline
        text={
          projectData ? `Edit project ${projectData.name}` : 'Add a new project'
        }
      />
      <ContentWithHints hints={[projectHints.projectDescription]}>
        <FormGroupWrapper caption="Basic Information">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormElementWrapper errors={errors.name}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ maxWidth: '500px' }}
                  label="Project name"
                  placeholder="Please enter a project name"
                  error={!!errors.name}
                  {...field}
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Name is required for projects.',
                    },
                  })}
                />
              </FormElementWrapper>
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormElementWrapper errors={errors.description}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  label="Project description"
                  placeholder="Please enter a short project description to provide some context"
                  error={!!errors.description}
                  {...field}
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'Description is required for projects.',
                    },
                  })}
                />
              </FormElementWrapper>
            )}
          />
        </FormGroupWrapper>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {projectData ? 'Save changes to project' : 'Create new project'}
        </Button>
      </ContentWithHints>
    </>
  );
};

export default ProjectForm;
