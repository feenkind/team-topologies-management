import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { projectHints } from '../../constants/hints';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { useAppDispatch } from '../../hooks';
import { addProject } from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import axiosInstance from '../../axios';

interface IProjectAddFormInput {
  name: string;
  description: string;
}

const ProjectAddForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProjectAddFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IProjectAddFormInput> = (data) => {
    axiosInstance
      .post('/projects', { name: data.name, description: data.description })
      .then((response) => {
        dispatch(
          addProject({
            id: response.data.id,
            name: data.name,
            description: data.description,
          }),
        );

        navigate(`/project/${response.data.id}`);
      });
  };

  return (
    <>
      <PageHeadline text="Add a new project" />
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
          Create new project
        </Button>
      </ContentWithHints>
    </>
  );
};

export default ProjectAddForm;
