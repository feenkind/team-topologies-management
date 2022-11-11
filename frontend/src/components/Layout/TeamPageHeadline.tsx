import * as React from 'react';
import {
  teamTopology as teamTopologyEnum,
  teamTopologyColor,
} from '../../constants/categories';
import { Typography } from '@mui/material';

interface ITeamPageHeadlineProps {
  teamName: string;
  teamTopology: teamTopologyEnum;
}

const TeamPageHeadline: React.FC<ITeamPageHeadlineProps> = ({
  teamName,
  teamTopology,
}: ITeamPageHeadlineProps) => {
  return (
    <Typography
      component="h1"
      variant="h6"
      paddingX={2}
      paddingY={1}
      marginBottom={3}
      border={`1px solid ${teamTopologyColor[teamTopology].color}`}
      display="inline-block"
      sx={{ backgroundColor: teamTopologyColor[teamTopology].backgroundColor }}
    >
      Team {teamName}
    </Typography>
  );
};

export default TeamPageHeadline;
