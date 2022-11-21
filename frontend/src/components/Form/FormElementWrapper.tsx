import * as React from 'react';
import { FormHelperText } from '@mui/material';
import { FieldError } from 'react-hook-form';

interface IFormElementWrapperProps {
  children: React.ReactNode;
  errors: FieldError | undefined;
}

const FormElementWrapper: React.FC<IFormElementWrapperProps> = ({
  errors,
  children,
}: IFormElementWrapperProps) => {
  return (
    <>
      {children}
      {errors && <FormHelperText error>{errors.message}</FormHelperText>}
    </>
  );
};

export default FormElementWrapper;
