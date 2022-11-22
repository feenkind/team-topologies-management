import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import { useState } from 'react';
import { addProject, IProject } from '../../store/slices/projectSlice';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import {
  AppBar,
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
    formState: { errors },
  } = useForm<IDomainFormInput>();

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

  // const domains = useAppSelector(
  //   (state) => state.domain.domains[currentProject.id] || [],
  // );
  //
  // const domain = domains && domains.find((domain) => domain.id === domainId);
  // if (!domain) {
  //   return <Page404 />;
  // }

  return (
    <>
      <PageHeadline text={`Add domain`} />
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
          <Button
            onClick={() => {
              navigate(-1);
            }}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {'Create new domain'}
          </Button>
        </ActionWrapperBottom>
      </ContentWithHints>
    </>
  );
};

export default DomainForm;
