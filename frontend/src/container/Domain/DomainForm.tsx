import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import { useState } from 'react';
import { IProject } from '../../store/slices/projectSlice';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import { useForm, Controller } from 'react-hook-form';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { complexity } from '../../constants/categories';

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

            <Grid item xs={12} md={6}>
              <Controller
                name="complexity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormElementWrapper errors={errors.complexity}>
                    <Select value={complexity.SIMPLE}>
                      <MenuItem value={complexity.SIMPLE}>
                        {complexity.SIMPLE}
                      </MenuItem>
                      <MenuItem value={complexity.COMPLICATED}>
                        {complexity.COMPLICATED}
                      </MenuItem>
                      <MenuItem value={complexity.COMPLEX}>
                        {complexity.COMPLEX}
                      </MenuItem>
                    </Select>
                  </FormElementWrapper>
                )}
              />
            </Grid>
          </Grid>
        </FormGroupWrapper>
      </ContentWithHints>
    </>
  );
};

export default DomainForm;
