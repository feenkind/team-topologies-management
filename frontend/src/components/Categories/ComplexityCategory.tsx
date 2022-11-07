import * as React from 'react';
import { Chip } from '@mui/material';
import { complexity as complexityEnum } from '../../constants/categories';
import { amber, deepOrange, teal } from '@mui/material/colors';

interface IComplexityCategoryProps {
  complexity: complexityEnum;
}

const ComplexityCategory: React.FC<IComplexityCategoryProps> = ({
  complexity,
}: IComplexityCategoryProps) => {
  let color: string = teal[400];
  if (complexity === complexityEnum.COMPLICATED) {
    color = amber[600];
  }
  if (complexity === complexityEnum.COMPLEX) {
    color = deepOrange[900];
  }

  return (
    <Chip
      label={complexity}
      sx={{ color: color, borderColor: color }}
      variant="outlined"
    />
  );
};

export default ComplexityCategory;
