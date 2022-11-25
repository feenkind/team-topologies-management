import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface IFieldRemoveButtonProps {
  onClick: () => void;
  tooltipText: string;
}

const FieldRemoveButton: React.FC<IFieldRemoveButtonProps> = ({
  onClick,
  tooltipText,
}: IFieldRemoveButtonProps) => {
  return (
    <Tooltip title={tooltipText}>
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default FieldRemoveButton;
