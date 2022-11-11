import * as React from 'react';
import { Typography } from '@mui/material';
import {
  dependencyColor,
  dependencyType as dependencyTypeEnum,
} from '../../constants/categories';

interface IDependencyCategoryProps {
  dependencyType: dependencyTypeEnum;
}

const DependencyCategory: React.FC<IDependencyCategoryProps> = ({
  dependencyType,
}: IDependencyCategoryProps) => {
  return (
    <Typography
      color={dependencyColor[dependencyType]}
      variant="body2"
      fontWeight={dependencyType === dependencyTypeEnum.BLOCKING ? 600 : 400}
    >
      {dependencyType}
    </Typography>
  );
};

export default DependencyCategory;
