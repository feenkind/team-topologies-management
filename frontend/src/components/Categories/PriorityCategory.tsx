import * as React from 'react';
import { Chip } from '@mui/material';
import { priority as priorityEnum } from '../../constants/categories';
import { deepPurple, grey, teal } from '@mui/material/colors';

interface IPriorityCategoryProps {
  priority: priorityEnum;
}

const PriorityCategory: React.FC<IPriorityCategoryProps> = ({
  priority,
}: IPriorityCategoryProps) => {
  let color: string = grey[500];
  if (priority === priorityEnum.SUPPORTING) {
    color = deepPurple[300];
  }
  if (priority === priorityEnum.CORE) {
    color = teal[700];
  }

  return (
    <Chip
      label={priority}
      sx={{ color: color, borderColor: color }}
      variant="outlined"
    />
  );
};

export default PriorityCategory;
