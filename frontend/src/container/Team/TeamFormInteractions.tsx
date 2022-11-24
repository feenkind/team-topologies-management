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

interface ITeamFormInteractionsProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
}

const TeamFormInteractions: React.FC<ITeamFormInteractionsProps> = ({
  register,
  control,
  errors,
}: ITeamFormInteractionsProps) => {
  return (
    <FormGroupWrapper caption="Basic">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Controller
            name="expectedDuration"
            control={control}
            defaultValue=""
            {...register}
            render={({ field }) => (
              <FormElementWrapper errors={errors.expectedDuration}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Expected duration"
                  type="number"
                  placeholder="Please enter the amount of weeks you expect this interaction to last"
                  error={!!errors.expectedDuration}
                  {...field}
                  {...register('expectedDuration', {
                    required: {
                      value: true,
                      message:
                        'Expected duration is required for interactions.',
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

export default TeamFormInteractions;
