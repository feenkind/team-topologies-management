import * as React from 'react';
import { Button, Grid } from '@mui/material';
import ActionWrapperBottom from '../Layout/ActionWrapperBottom';

interface IFormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel: string;
  changeNote?: React.ReactNode;
}

const FormActions: React.FC<IFormActionsProps> = ({
  onCancel,
  onSubmit,
  submitLabel,
  changeNote,
}) => {
  return (
    <ActionWrapperBottom>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          {changeNote}
        </Grid>
        <Grid item xs={12} md={6} textAlign="right">
          <Button onClick={onCancel} variant="outlined" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ minWidth: '250px' }}
          >
            {submitLabel}
          </Button>
        </Grid>
      </Grid>
    </ActionWrapperBottom>
  );
};

export default FormActions;
