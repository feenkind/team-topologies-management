import * as React from 'react';
import { teamType as teamTopologyEnum } from '../../constants/categories';
import { Typography } from '@mui/material';
import TeamShape from '../TeamShape';

interface ITeamPageHeadlineProps {
  teamName: string;
  teamType: teamTopologyEnum;
}

const TeamPageHeadline: React.FC<ITeamPageHeadlineProps> = ({
  teamName,
  teamType,
}: ITeamPageHeadlineProps) => {
  return (
    <Typography component="h1" variant="h6" display="inline-block">
      <TeamShape label={teamName} teamType={teamType} />
    </Typography>
  );
};

export default TeamPageHeadline;
