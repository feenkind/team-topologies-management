import * as React from 'react';
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import FormElementWrapper from './FormElementWrapper';
import { TextField } from '@mui/material';

interface IControlledTextInputProps {
  error: FieldError | undefined;
  // for reusability, the control and register are not typed
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
}

const ControlledTextInput: React.FC<IControlledTextInputProps> = ({
  error,
  control,
  register,
  name,
  label,
  placeholder,
  required,
}: IControlledTextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormElementWrapper errors={error}>
          <TextField
            required
            fullWidth
            margin="normal"
            variant="outlined"
            label={label}
            placeholder={placeholder}
            error={!!error}
            {...field}
            {...register(name, {
              required: {
                value: required,
                message: 'This field is required.',
              },
            })}
          />
        </FormElementWrapper>
      )}
    />
  );
};

export default ControlledTextInput;
