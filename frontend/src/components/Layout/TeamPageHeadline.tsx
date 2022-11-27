import * as React from 'react';
import { Box, Typography } from '@mui/material';
import TeamShape from '../TeamShape';
import { teamType as teamTopologyEnum } from '../../types/teamTypes';

interface ITeamPageHeadlineProps {
  teamName: string;
  teamType: teamTopologyEnum;
  children?: React.ReactNode | React.ReactNode[];
}

const TeamPageHeadline: React.FC<ITeamPageHeadlineProps> = ({
  teamName,
  teamType,
  children,
}: ITeamPageHeadlineProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography component="h1" variant="h6" display="inline-block">
        <TeamShape label={teamName} teamType={teamType} />
      </Typography>
      {children}
    </Box>
  );
};

export default TeamPageHeadline;
