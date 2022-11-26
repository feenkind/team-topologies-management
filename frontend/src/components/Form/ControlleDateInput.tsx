import * as React from 'react';
import {
  Control,
  Controller,
  FieldError,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

interface IControlledDateInputProps {
  error: FieldError | undefined | Merge<FieldError, undefined>;
  // for reusability, the control and register are not typed
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  label: string;
  required?: boolean;
}

const ControlledDateInput: React.FC<IControlledDateInputProps> = ({
  error,
  control,
  register,
  name,
  label,
  required,
}: IControlledDateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <DatePicker
            label={label}
            inputFormat="DD/MM/YYYY"
            {...field}
            value={field.value}
            onChange={(value) =>
              field.onChange(moment(value).format('YYYY-MM-DD'))
            }
            renderInput={(params) => (
              <TextField
                {...register(name, {
                  required: {
                    value: required || false,
                    message: 'This field is required.',
                  },
                })}
                id={name}
                margin="none"
                variant="outlined"
                fullWidth
                helperText={error?.message || null}
                {...params}
                error={!!error}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default ControlledDateInput;
