import * as React from 'react';
import { Chip } from '@mui/material';
import {
  complexity as complexityEnum,
  complexityColor,
} from '../../types/complexityTypes';

interface IComplexityCategoryProps {
  complexity: complexityEnum;
}

const ComplexityCategory: React.FC<IComplexityCategoryProps> = ({
  complexity,
}: IComplexityCategoryProps) => {
  return (
    <Chip
      label={complexity}
      sx={{
        color: complexityColor[complexity],
        borderColor: complexityColor[complexity],
      }}
      variant="outlined"
    />
  );
};

export default ComplexityCategory;
