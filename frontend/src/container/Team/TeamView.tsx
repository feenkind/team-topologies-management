import * as React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import { useAppSelector } from '../../hooks';

const TeamView: React.FC = () => {
  const { teamId } = useParams<{
    teamId: string;
  }>();
  const team = useAppSelector((state) =>
    state.team.teams.find((team) => teamId && team.id === teamId),
  );
  if (!teamId || !team) {
    return <Page404 />;
  }

  return (
    <Typography>Here will be details for team {team.name} soon.</Typography>
  );
};

export default TeamView;
