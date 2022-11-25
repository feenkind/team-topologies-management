import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProject } from '../../store/slices/projectSlice';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { complexity, priority } from '../../constants/categories';
import axiosInstance from '../../axios';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';
import { domainHints } from '../../constants/hints';
import FormActions from '../../components/Form/FormActions';
import ControlledTextInput from '../../components/Form/ControlledTextInput';

interface IDomainFormInput {
  name: string;
  description: string;
  priority: string;
  complexity: string;
  changeNote: string;
}

const DomainForm: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
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

    if (domainData) {
      axiosInstance
        .put(`/domains/${domainData.id}`, {
          ...domain,
          changeNote: data.changeNote,
        })
        .then(() => {
          // trigger new data loading from backend to refresh all data
          dispatch(setDataLoaded(false));
          // go to detail view after editing
          navigate(`/project/${projectId}/domain/${domainData.id}`);
        })
        .catch(() => dispatch(setNetworkError(true)));
    }

    if (!domainData) {
      axiosInstance
        .post('/domains', domain)
        .then((response) => {
          // trigger new data loading from backend to refresh all data
          dispatch(setDataLoaded(false));
          // go to view after adding
          navigate(`/project/${projectId}/domain/${response.data.id}`);
        })
        .catch(() => dispatch(setNetworkError(true)));
    }
  };

  return (
    <>
      <PageHeadline
        text={
          domainData
            ? `Edit domain ${domainData.name}`
            : `Add a new domain to project ${currentProject.name}`
        }
      />
      <ContentWithHints
        hints={[domainHints.domainPriority, domainHints.domainComplexity]}
      >
        <FormGroupWrapper caption="Basic Information">
          <Grid item xs={12} md={6}>
            <ControlledTextInput
              error={errors.name}
              control={control}
              register={register}
              name="name"
              label="Domain name"
              placeholder="The name of the domain"
              required={true}
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
            <ControlledTextInput
              error={errors.description}
              control={control}
              register={register}
              name="description"
              label="Domain description"
              placeholder="A short domain description and details to technical responsible person"
              required={true}
              multiline={true}
            />
          </Grid>
        </FormGroupWrapper>

        <FormActions
          onCancel={() => {
            navigate(-1);
          }}
          onSubmit={handleSubmit(onSubmit)}
          submitLabel={
            domainData ? 'Save changes to domain' : 'Create new domain'
          }
          changeNote={
            domainData && (
              <ControlledTextInput
                error={errors.changeNote}
                control={control}
                register={register}
                name="changeNote"
                label="Note"
                placeholder="The reason for your changes"
                required={true}
              />
            )
          }
        />
      </ContentWithHints>
    </>
  );
};

export default DomainForm;
