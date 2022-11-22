import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import { useState } from 'react';
import { IProject } from '../../store/slices/projectSlice';
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

interface IDomainFormInput {
  name: string;
  description: string;
  priority: string;
  complexity: string;
}

const DomainForm: React.FC = () => {
  const navigate = useNavigate();
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
    console.log(data);
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
      <ContentWithHints>
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
              <FormControl fullWidth variant="outlined" margin="normal">
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
            <FormControl fullWidth variant="outlined" margin="normal">
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
