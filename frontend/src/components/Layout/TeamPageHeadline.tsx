import * as React from 'react';
import { teamTopology as teamTopologyEnum } from '../../constants/categories';
import { Typography } from '@mui/material';
import TeamShape from '../TeamShape';

interface ITeamPageHeadlineProps {
  teamName: string;
  teamTopology: teamTopologyEnum;
}

const TeamPageHeadline: React.FC<ITeamPageHeadlineProps> = ({
  teamName,
  teamTopology,
}: ITeamPageHeadlineProps) => {
  return (
    <Typography component="h1" variant="h6" display="inline-block">
      <TeamShape label={teamName} teamTopology={teamTopology} />
    </Typography>
  );
};

export default TeamPageHeadline;
