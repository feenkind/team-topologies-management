import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Grid } from '@mui/material';
import { complexity, priority } from '../../constants/categories';
import axiosInstance from '../../axios';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';
import { domainHints } from '../../constants/hints';
import FormActions from '../../components/Form/FormActions';
import ControlledTextInput from '../../components/Form/ControlledTextInput';
import ControlledSelect from '../../components/Form/ControlledSelect';
import { IDomain } from '../../store/slices/domain/domainSlice';

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

  const [domainData, setDomainData] = useState<IDomain>();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDomainFormInput>();

  useEffect(() => {
    // make sure to always work with the newest data when editing
    if (domainId && !domainData) {
      axiosInstance
        .get(`/domains/${domainId}`)
        .then((response) => {
          setDomainData(response.data);
        })
        .catch(() => dispatch(setNetworkError(true)));
    }
    if (!domainId) {
      // needed if component does not unmount between edit and add, e.g.
      // if a user edits a domain and clicks on add domain directly after
      setDomainData(undefined);
      reset({ name: '', description: '', complexity: '', priority: '' });
    }
  }, [domainId, domainData, setDomainData, dispatch, reset]);

  useEffect(() => {
    if (domainData) {
      reset({
        name: domainData.name,
        description: domainData.description,
        priority: domainData.priority,
        complexity: domainData.complexity,
      });
    }
  }, [domainData, reset]);

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
        isForm
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
            <ControlledSelect
              error={errors.complexity}
              control={control}
              register={register}
              name="complexity"
              label="Complexity"
              options={Object.values(complexity).map((complexity) => ({
                label: complexity,
                value: complexity,
              }))}
              required={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect
              error={errors.priority}
              control={control}
              register={register}
              name="priority"
              label="Priority"
              options={Object.values(priority).map((priority) => ({
                label: priority,
                value: priority,
              }))}
              required={true}
            />
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
