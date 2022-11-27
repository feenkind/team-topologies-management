import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TeamShape from '../TeamShape';
import { teamType as teamTopologyEnum } from '../../types/teamTypes';

interface ITeamLinkButtonProps {
  label: string;
  url: string;
  teamType: teamTopologyEnum;
}

const TeamLink: React.FC<ITeamLinkButtonProps> = ({
  label,
  url,
  teamType,
}: ITeamLinkButtonProps) => {
  return (
    <Button
      component={Link}
      to={url}
      size="small"
      // variant="outlined"
    >
      <TeamShape label={label} teamType={teamType} />
    </Button>
  );
};

export default TeamLink;
