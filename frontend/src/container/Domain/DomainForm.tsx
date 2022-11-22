import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppDispatch } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProject } from '../../store/slices/projectSlice';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { complexity, priority } from '../../constants/categories';
import ActionWrapperBottom from '../../components/Layout/ActionWrapperBottom';
import axiosInstance from '../../axios';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';
import { domainHints } from '../../constants/hints';

interface IDomainFormInput {
  name: string;
  description: string;
  priority: string;
  complexity: string;
  changeNote: string;
}

const DomainForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projectId, domainId } = useParams<{
    projectId: string;
    domainId: string;
  }>();

  const [domainData, setDomainData] = useState<IProject>();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IDomainFormInput>();

  useEffect(() => {
    // make sure to always work with the newest data when editing
    if (domainId) {
      axiosInstance
        .get(`/domains/${domainId}`)
        .then((response) => {
          setDomainData(response.data);
          setValue('name', response.data.name);
          setValue('description', response.data.description);
          setValue('priority', response.data.priority);
          setValue('complexity', response.data.complexity);
        })
        .catch(() => dispatch(setNetworkError(true)));
    } else {
      // needed if component does not unmount between edit and add, e.g.
      // if a user edits a domain and clicks on add domain directly after
      setDomainData(undefined);
      reset({ name: '', description: '', complexity: '', priority: '' });
    }
  }, [domainId, setDomainData, setValue, dispatch, reset]);

  const onSubmit: SubmitHandler<IDomainFormInput> = (data) => {
    const domain = {
      name: data.name,
      description: data.description,
      priority: data.priority,
      complexity: data.complexity,
      projectId: projectId,
    };

    axiosInstance
      .post('/domains', domain)
      .then((response) => {
        // trigger new data loading from backend to refresh all data
        dispatch(setDataLoaded(false));
        // go to view after adding
        navigate(`/project/${projectId}/domain/${response.data.id}`);
      })
      .catch(() => dispatch(setNetworkError(true)));
  };

  return (
    <>
      <PageHeadline
        text={
          domainData ? `Edit domain ${domainData.name}` : 'Add' + ' new domain'
        }
      />
      <ContentWithHints
        hints={[domainHints.domainPriority, domainHints.domainComplexity]}
      >
        <FormGroupWrapper caption="Basic Information">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
                      label="Domain name"
                      placeholder="Please enter a domain name"
                      error={!!errors.name}
                      {...field}
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Name is required for domains.',
                        },
                      })}
                    />
                  </FormElementWrapper>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.complexity}
              >
                <InputLabel id="complexity-select">Complexity</InputLabel>
                <Controller
                  name="complexity"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormElementWrapper errors={errors.complexity}>
                      <Select
                        {...field}
                        fullWidth
                        labelId="complexity-select"
                        label="Complexity"
                        {...register('complexity', {
                          required: {
                            value: true,
                            message: 'Please choose a domain complexity.',
                          },
                        })}
                      >
                        {Object.values(complexity).map((complexity) => (
                          <MenuItem key={complexity} value={complexity}>
                            {complexity}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormElementWrapper>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!errors.priority}
            >
              <InputLabel id="priority-select">Priority</InputLabel>
              <Controller
                name="priority"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormElementWrapper errors={errors.priority}>
                    <Select
                      {...field}
                      fullWidth
                      labelId="priority-select"
                      label="Priority"
                      {...register('priority', {
                        required: {
                          value: true,
                          message: 'Please choose a domain priority.',
                        },
                      })}
                    >
                      {Object.values(priority).map((priority) => (
                        <MenuItem key={priority} value={priority}>
                          {priority}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormElementWrapper>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
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
                    label="Domain description"
                    placeholder="Please enter a short domain description and technical responsible details"
                    error={!!errors.description}
                    {...field}
                    {...register('description', {
                      required: {
                        value: true,
                        message: 'Description is required for domains.',
                      },
                    })}
                  />
                </FormElementWrapper>
              )}
            />
          </Grid>
        </FormGroupWrapper>

        <ActionWrapperBottom>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Controller
                name="changeNote"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormElementWrapper errors={errors.changeNote}>
                    <TextField
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={1}
                      label="Note"
                      placeholder="Please enter a short description why you did those changes"
                      sx={{
                        mr: 9,
                      }}
                      error={!!errors.changeNote}
                      {...field}
                      {...register('changeNote', {
                        required: {
                          value: true,
                          message: 'Please add a reason for your changes',
                        },
                      })}
                    />
                  </FormElementWrapper>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} textAlign="right">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                variant="outlined"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{ minWidth: '250px' }}
              >
                {domainData ? 'Save changes to domain' : 'Create new domain'}
              </Button>
            </Grid>
          </Grid>
        </ActionWrapperBottom>
      </ContentWithHints>
    </>
  );
};

export default DomainForm;
