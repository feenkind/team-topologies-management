import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';
import { Button, Grid, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import ActionWrapperBottom from '../../components/Layout/ActionWrapperBottom';
import { useState } from 'react';
import { IProject } from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/Layout/Tabs';
import TeamFormInformation from './TeamFormInformation';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TeamFormInteractions from './TeamFormInteractions';

export interface ITeamFormInput {
  changeNote: string;
  name: string;
  expectedDuration: string;
}

const TeamForm: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );

  const [teamData, setTeamData] = useState<IProject>();

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    trigger,
    formState: { errors },
  } = useForm<ITeamFormInput>();

  const onSubmit: SubmitHandler<ITeamFormInput> = async (data) => {
    const result = await trigger('name');
    console.log(result);
    console.log(data);
  };

  const informationError = !!errors.name;
  const interactionsError = !!errors.expectedDuration;

  return (
    <>
      <PageHeadline text={`Add a new team to project ${currentProject.name}`} />
      <ContentWithHints>
        <Tabs
          tabContent={[
            {
              tabName: 'Information',
              tabIcon: informationError ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
              content: (
                <TeamFormInformation
                  register={register}
                  control={control}
                  errors={errors}
                />
              ),
            },
            { tabName: 'Work', content: '' },
            {
              tabName: 'Interactions',
              tabIcon: interactionsError ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
              content: (
                <TeamFormInteractions
                  register={register}
                  control={control}
                  errors={errors}
                />
              ),
            },
            { tabName: 'Dependencies', content: '' },
          ]}
        />

        <ActionWrapperBottom>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              {teamData && (
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
              )}
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
                {teamData ? 'Save changes to team' : 'Create new team'}
              </Button>
            </Grid>
          </Grid>
        </ActionWrapperBottom>
      </ContentWithHints>
    </>
  );
};

export default TeamForm;
