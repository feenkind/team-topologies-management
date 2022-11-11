import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  teamTopology as teamTopologyEnum,
  teamTopologyColor,
} from '../../constants/categories';

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
      variant="outlined"
      sx={{
        m: 0.5,
        backgroundColor: teamTopologyColor[teamTopology].backgroundColor,
        borderColor: teamTopologyColor[teamTopology].color,
        color: 'black',
      }}
    >
      {label}
    </Button>
  );
};

export default TeamLink;
