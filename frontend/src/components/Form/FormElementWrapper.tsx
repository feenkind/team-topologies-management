import * as React from 'react';
import { FormHelperText } from '@mui/material';

interface IFormElementWrapperProps {
  children: React.ReactNode;
  // because of react hook form typing, especially for array values, we can
  // not really know the type
  errors: any;
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
