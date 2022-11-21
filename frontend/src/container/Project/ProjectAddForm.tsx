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

interface IProjectAddFormInput {
  name: string;
  description: string;
}

const ProjectAddForm: React.FC = () => {
  const { register, control, handleSubmit } = useForm<IProjectAddFormInput>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IProjectAddFormInput> = (data) => {
    const projectId = Date.now().toString();
    dispatch(
      addProject({
        id: projectId,
        name: data.name,
        description: data.description,
      }),
    );
    navigate(`/project/${projectId}`);
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
              <TextField
                required
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ maxWidth: '500px' }}
                label="Project name"
                placeholder="Please enter a project name"
                {...field}
                {...register('name', { required: true })}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                required
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                label="Project description"
                placeholder="Please enter a short project description to provide some context"
                {...field}
                {...register('description', { required: true })}
              />
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
