import * as React from 'react';
import { Chip } from '@mui/material';
import {
  teamType as teamTopologyEnum,
  teamTypeColor,
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
        borderColor: teamTypeColor[teamTopology].color,
        backgroundColor: teamTypeColor[teamTopology].backgroundColor,
      }}
      variant="outlined"
    />
  );
};

export default TeamTopologyCategory;
