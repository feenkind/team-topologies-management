import * as React from 'react';
import { Chip } from '@mui/material';
import {
  teamTopology as teamTopologyEnum,
  teamTopologyColors,
} from '../../constants/categories';

interface ITeamTopologyCategoryProps {
  teamTopology: teamTopologyEnum;
}

const TeamTopologyCategory: React.FC<ITeamTopologyCategoryProps> = ({
  teamTopology,
}: ITeamTopologyCategoryProps) => {
  return (
    <Chip
      label={teamTopology}
      sx={{
        color: 'black',
        borderColor: teamTopologyColors[teamTopology].color,
        backgroundColor: teamTopologyColors[teamTopology].backgroundColor,
      }}
      variant="outlined"
    />
  );
};

export default TeamTopologyCategory;
