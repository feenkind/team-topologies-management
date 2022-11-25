import * as React from 'react';
import {
  Control,
  Controller,
  FieldError,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import moment from 'moment';

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
  console.log(error);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
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
                margin="normal"
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
