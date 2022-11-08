import * as React from 'react';
import { Chip } from '@mui/material';
import { teamTopology as teamTopologyEnum } from '../../constants/categories';

interface ITeamTopologyCategoryProps {
  teamTopology: teamTopologyEnum;
}

const TeamTopologyCategory: React.FC<ITeamTopologyCategoryProps> = ({
  teamTopology,
}: ITeamTopologyCategoryProps) => {
  let color = '#FFD966';
  let backgroundColor = '#FFEDB8';
  if (teamTopology === teamTopologyEnum.PLATFORM) {
    color = '#6D9EEB';
    backgroundColor = '#B7CDF1';
  }
  if (teamTopology === teamTopologyEnum.ENABLING) {
    color = '#D09CB7';
    backgroundColor = '#DFBDCF';
  }
  if (teamTopology === teamTopologyEnum.COMPLICATED_SUBSYSTEM) {
    color = '#E88814';
    backgroundColor = '#FFC08B';
  }
  if (teamTopology === teamTopologyEnum.UNDEFINED) {
    color = '#9B99AF';
    backgroundColor = '#EBEBEF';
  }

  return (
    <Chip
      label={teamTopology}
      sx={{
        color: 'black',
        borderColor: color,
        backgroundColor: backgroundColor,
      }}
      variant="outlined"
    />
  );
};

export default TeamTopologyCategory;
