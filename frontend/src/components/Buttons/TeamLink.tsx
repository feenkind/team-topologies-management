import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { teamType as teamTopologyEnum } from '../../constants/categories';
import TeamShape from '../TeamShape';

interface ITeamLinkButtonProps {
  label: string;
  url: string;
  teamTopology: teamTopologyEnum;
}

const TeamLink: React.FC<ITeamLinkButtonProps> = ({
  label,
  url,
  teamTopology,
}: ITeamLinkButtonProps) => {
  return (
    <Button
      component={Link}
      to={url}
      size="small"
      // variant="outlined"
    >
      <TeamShape label={label} teamTopology={teamTopology} />
    </Button>
  );
};

export default TeamLink;
