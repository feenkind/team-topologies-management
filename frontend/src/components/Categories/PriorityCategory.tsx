import * as React from 'react';
import { Chip } from '@mui/material';
import { priority as priorityEnum } from '../../constants/categories';
import { amber, deepOrange, teal } from '@mui/material/colors';

interface IPriorityCategoryProps {
  priority: priorityEnum;
}

const PriorityCategory: React.FC<IPriorityCategoryProps> = ({
  priority,
}: IPriorityCategoryProps) => {
  let color: string = teal[400];
  if (priority === priorityEnum.SUPPORTING) {
    color = amber[600];
  }
  if (priority === priorityEnum.CORE) {
    color = deepOrange[900];
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
