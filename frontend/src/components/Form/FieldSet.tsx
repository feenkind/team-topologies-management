import * as React from 'react';
import { Divider, Grid } from '@mui/material';

interface IFieldSetProps {
  removeButton: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

const FieldSet: React.FC<IFieldSetProps> = ({
  removeButton,
  children,
}: IFieldSetProps) => {
  return (
    <>
      <Grid item container spacing={2} alignItems="center">
        <Grid container item spacing={2} xs={12} md={11}>
          {children}
        </Grid>
        <Grid item xs={12} md={1}>
          {removeButton}
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Divider />
      </Grid>
    </>
  );
};

export default FieldSet;
