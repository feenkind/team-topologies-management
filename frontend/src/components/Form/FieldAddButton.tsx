import * as React from 'react';
import { Button } from '@mui/material';

interface IFieldAddButtonProps {
  onClick: () => void;
  label: string;
}

const FieldAddButton: React.FC<IFieldAddButtonProps> = ({
  onClick,
  label,
}: IFieldAddButtonProps) => {
  return (
    <Button variant="outlined" onClick={onClick} sx={{ mt: 1 }}>
      {label}
    </Button>
  );
};

export default FieldAddButton;
