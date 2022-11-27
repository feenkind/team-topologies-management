import * as React from 'react';
import {
  Control,
  Controller,
  FieldError,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import FormElementWrapper from './FormElementWrapper';
import { TextField } from '@mui/material';

interface IControlledTextInputProps {
  error: FieldError | undefined | Merge<FieldError, undefined>;
  // for reusability, the control and register are not typed
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
  isNumberField?: boolean;
  isPasswordField?: boolean;
}

const ControlledTextInput: React.FC<IControlledTextInputProps> = ({
  error,
  control,
  register,
  name,
  label,
  placeholder,
  required,
  multiline,
  isNumberField,
  isPasswordField,
}: IControlledTextInputProps) => {
  let type = 'text';
  if (isNumberField) {
    type = 'number';
  }
  if (isPasswordField) {
    type = 'password';
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormElementWrapper errors={error}>
          <TextField
            required={required || false}
            fullWidth
            margin="none"
            variant="outlined"
            multiline={multiline || false}
            rows={multiline ? 4 : 1}
            type={type}
            {...(isNumberField && { inputProps: { ...{ min: 0 } } })}
            label={label}
            placeholder={placeholder}
            error={!!error}
            {...field}
            {...register(name, {
              required: {
                value: required || false,
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
