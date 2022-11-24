import * as React from 'react';
import {
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
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';
import { teamType } from '../../constants/categories';

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
  return (
    <>
      <FormGroupWrapper caption="Basic">
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
                    label="Team name"
                    placeholder="Please enter a team name"
                    error={!!errors.name}
                    {...field}
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Name is required for teams.',
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
                        message: 'Focus is required for teams.',
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
          <Grid item xs={12} md={6}>
            Domain
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
          <Grid item xs={12} md={6}>
            Domain
          </Grid>
        </Grid>
      </FormGroupWrapper>
    </>
  );
};

export default TeamFormInformation;
