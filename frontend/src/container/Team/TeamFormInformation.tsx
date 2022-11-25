import * as React from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';
import { teamType } from '../../constants/categories';
import { useAppSelector } from '../../hooks';
import { channelType } from '../../constants/teamApi';

interface ITeamFormInformationProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
}

const TeamFormInformation: React.FC<ITeamFormInformationProps> = ({
  register,
  control,
  errors,
}: ITeamFormInformationProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const projectDomains = useAppSelector(
    (state) => state.domain.domains[currentProject.id] || [],
  );

  const {
    fields: channelFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'channels',
  });

  return (
    <>
      <FormGroupWrapper caption="Basic">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
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
                    label="Team name"
                    placeholder="Please enter a team name"
                    error={!!errors.name}
                    {...field}
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Name is required.',
                      },
                    })}
                  />
                </FormElementWrapper>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!errors.teamType}
            >
              <InputLabel id="teamType-select">Team type</InputLabel>
              <Controller
                name="teamType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormElementWrapper errors={errors.teamType}>
                    <Select
                      {...field}
                      fullWidth
                      labelId="teamType-select"
                      label="Team type"
                      {...register('teamType', {
                        required: {
                          value: true,
                          message: 'Please choose a team type.',
                        },
                      })}
                    >
                      {Object.values(teamType).map((type) => (
                        <MenuItem key={type} value={type}>
                          {type === teamType.STREAM_ALIGNED &&
                            'stream-aligned team'}
                          {type === teamType.PLATFORM && 'platform team'}
                          {type === teamType.COMPLICATED_SUBSYSTEM &&
                            'complicated subsystem team'}
                          {type === teamType.UNDEFINED && 'undefined type'}
                          {type === teamType.ENABLING && 'enabling team'}
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
              name="focus"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormElementWrapper errors={errors.focus}>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Focus"
                    placeholder="What is the focus of this team?"
                    error={!!errors.focus}
                    {...field}
                    {...register('focus', {
                      required: {
                        value: true,
                        message: 'Focus is required.',
                      },
                    })}
                  />
                </FormElementWrapper>
              )}
            />
          </Grid>
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Additional">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!errors.domains}
            >
              <InputLabel id="domains-select">Domains</InputLabel>
              <Controller
                name="domains"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <FormElementWrapper errors={errors.domains}>
                    <Select
                      {...field}
                      fullWidth
                      labelId="domains-select"
                      label="Domains"
                      multiple
                    >
                      {projectDomains.map((domain) => (
                        <MenuItem key={domain.id} value={domain.id}>
                          {domain.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormElementWrapper>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="fte"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <FormElementWrapper errors={errors.fte}>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Full Time Equivalent"
                    type="number"
                    placeholder="FTE on this team"
                    error={!!errors.fte}
                    {...field}
                    {...register('fte', {
                      valueAsNumber: true,
                      required: {
                        value: true,
                        message: 'Full time equivalent is required.',
                      },
                    })}
                  />
                </FormElementWrapper>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="cognitiveLoad"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <FormElementWrapper errors={errors.cognitiveLoad}>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Cognitive Load"
                    type="number"
                    placeholder="Cognitive load for this team"
                    error={!!errors.cognitiveLoad}
                    {...field}
                    {...register('cognitiveLoad', {
                      valueAsNumber: true,
                      required: {
                        value: true,
                        message: 'Cognitive load is required.',
                      },
                    })}
                  />
                </FormElementWrapper>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="platform"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormElementWrapper errors={errors.platform}>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Platform (if applicable)"
                    placeholder="Platform this team is part of"
                    error={!!errors.platform}
                    {...field}
                  />
                </FormElementWrapper>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="wikiSearchTerms"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormElementWrapper errors={errors.wikiSearchTerms}>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Wiki search terms"
                    placeholder="Separate by comma"
                    error={!!errors.wikiSearchTerms}
                    {...field}
                  />
                </FormElementWrapper>
              )}
            />
          </Grid>
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Meetings">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            Meetings
          </Grid>
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Contact">
        <Grid container spacing={2}>
          <>
            {channelFields.map((field, index) => {
              console.log(index);
              return (
                <React.Fragment key={`channels.${index}`}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!errors.channels}
                    >
                      <InputLabel id={`channels.${index}.channelType-select`}>
                        Channel type
                      </InputLabel>
                      <Controller
                        name={`channels.${index}.channelType`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <FormElementWrapper errors={errors.channels}>
                            <Select
                              {...field}
                              fullWidth
                              labelId={`channels.${index}.channelType-select`}
                              label="Channel type"
                              {...register(`channels.${index}.channelType`, {
                                required: {
                                  value: true,
                                  message: 'Please choose a channel type.',
                                },
                              })}
                            >
                              {Object.values(channelType).map((type) => (
                                <MenuItem key={type} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormElementWrapper>
                        )}
                      />
                    </FormControl>
                  </Grid>
                </React.Fragment>
              );
            })}
            <Grid item xs={12} md={12}>
              <Button
                onClick={() => append({ channelType: '', channelName: '' })}
              >
                Add contact channel
              </Button>
            </Grid>
          </>
        </Grid>
      </FormGroupWrapper>
    </>
  );
};

export default TeamFormInformation;
