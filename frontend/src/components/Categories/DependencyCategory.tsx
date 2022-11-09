import * as React from 'react';
import { Typography } from '@mui/material';
import { dependencyType as dependencyTypeEnum } from '../../constants/categories';
import { amber, deepOrange, teal } from '@mui/material/colors';

interface IDependencyCategoryProps {
  dependencyType: dependencyTypeEnum;
}

const DependencyCategory: React.FC<IDependencyCategoryProps> = ({
  dependencyType,
}: IDependencyCategoryProps) => {
  let color: string = teal[400];
  let fontWeight = 400;
  if (dependencyType === dependencyTypeEnum.SLOWING) {
    color = amber[600];
  }
  if (dependencyType === dependencyTypeEnum.BLOCKING) {
    color = deepOrange[900];
    fontWeight = 600;
  }

  return (
    <Typography color={color} variant="body2" fontWeight={fontWeight}>
      {dependencyType}
    </Typography>
  );
};

export default DependencyCategory;
