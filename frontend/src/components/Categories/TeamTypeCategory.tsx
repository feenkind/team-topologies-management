import * as React from 'react';
import { Chip } from '@mui/material';
import {
  teamType as teamTopologyEnum,
  teamTypeColor,
} from '../../constants/categories';

interface ITeamTypeCategoryProps {
  teamType: teamTopologyEnum;
}

const TeamTypeCategory: React.FC<ITeamTypeCategoryProps> = ({
  teamType,
}: ITeamTypeCategoryProps) => {
  return (
    <Chip
      label={teamType}
      sx={{
        color: 'black',
        borderColor: teamTypeColor[teamType].color,
        backgroundColor: teamTypeColor[teamType].backgroundColor,
      }}
      variant="outlined"
    />
  );
};

export default TeamTypeCategory;
