import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';

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
    <FormGroupWrapper caption="Basic">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            {...register}
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
      </Grid>
    </FormGroupWrapper>
  );
};

export default TeamFormInformation;
