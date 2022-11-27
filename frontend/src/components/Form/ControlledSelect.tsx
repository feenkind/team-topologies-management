import * as React from 'react';
import {
  Control,
  Controller,
  FieldError,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import FormElementWrapper from './FormElementWrapper';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface IControlledSelectProps {
  error: FieldError | undefined | Merge<FieldError, undefined>;
  // for reusability, the control and register are not typed
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  label: string;
  required?: boolean;
  multiple?: boolean;
  options: { label: string; value: string }[];
  additionalOnSelect?: () => void;
}

const ControlledSelect: React.FC<IControlledSelectProps> = ({
  error,
  control,
  register,
  name,
  label,
  required,
  options,
  multiple,
  additionalOnSelect,
}: IControlledSelectProps) => {
  return (
    <FormControl fullWidth variant="outlined" error={!!error}>
      <InputLabel id={`${name}-select`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={multiple ? [] : ''}
        render={({ field }) => (
          <FormElementWrapper errors={error}>
            <Select
              {...field}
              fullWidth
              labelId={`${name}-select`}
              label={label}
              multiple={multiple || false}
              {...register(name, {
                required: {
                  value: required || false,
                  message: 'Please choose an option.',
                },
              })}
              onChange={(event) => {
                field.onChange(event);
                additionalOnSelect && additionalOnSelect();
              }}
            >
              {options.map((option, index) => (
                <MenuItem key={`${index}_${option.value}`} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormElementWrapper>
        )}
      />
    </FormControl>
  );
};

export default ControlledSelect;
