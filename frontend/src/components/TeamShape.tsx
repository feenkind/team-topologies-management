import * as React from 'react';
import { Box } from '@mui/material';
import {
  teamTopology as teamTopologyEnum,
  teamTopologyColor,
} from '../constants/categories';

interface ITeamShapeProps {
  label: string;
  teamTopology: teamTopologyEnum;
}

const TeamShape: React.FC<ITeamShapeProps> = ({
  label,
  teamTopology,
}: ITeamShapeProps) => {
  let paddingY = 0.5;
  if (teamTopology === teamTopologyEnum.PLATFORM) {
    paddingY = 0.7;
  }
  if (
    teamTopology === teamTopologyEnum.ENABLING ||
    teamTopology === teamTopologyEnum.COMPLICATED_SUBSYSTEM
  ) {
    paddingY = 1.5;
  }

  let lineStyle = 'solid';
  if (teamTopology === teamTopologyEnum.UNDEFINED) {
    lineStyle = 'dotted';
  }

  let clipPath = undefined;
  let clipPathBorder = undefined;
  if (teamTopology === teamTopologyEnum.COMPLICATED_SUBSYSTEM) {
    // generated by https://css-generators.com/custom-corners/
    clipPath =
      'polygon(0 16.00px,16.00px 0,calc(100% - 16.00px) 0,100% 16.00px,100% calc(100% - 16.00px),calc(100% - 16.00px) 100%,16.00px 100%,0 calc(100% - 16.00px))';
    clipPathBorder =
      'polygon(0 16.00px,16.00px 0,calc(100% - 16.00px) 0,100% 16.00px,100% calc(100% - 16.00px),calc(100% - 16.00px) 100%,16.00px 100%,0 calc(100% - 16.00px),0 16.00px,0.5px  calc(16.00px + 0.21px),0.5px calc(100% - 16.00px - 0.21px),calc(16.00px + 0.21px) calc(100% - 0.5px),calc(100% - 16.00px - 0.21px) calc(100% - 0.5px),calc(100% - 0.5px) calc(100% - 16.00px - 0.21px),calc(100% - 0.5px) calc(16.00px + 0.21px),calc(100% - 16.00px - 0.21px) 0.5px,calc(16.00px + 0.21px) 0.5px,0.5px calc(16.00px + 0.21px))';
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: paddingY,
        px: teamTopologyEnum.COMPLICATED_SUBSYSTEM ? 1.5 : 1,
        m: 0.5,
        backgroundColor: teamTopologyColor[teamTopology].backgroundColor,
        border: `1px ${lineStyle} ${teamTopologyColor[teamTopology].color}`,
        borderRadius: teamTopology === teamTopologyEnum.PLATFORM ? 0 : 2,
        color: 'black',
        fontWeight: 400,
        position: 'relative',
        clipPath: teamTopologyEnum.COMPLICATED_SUBSYSTEM ? clipPath : '',
        '&:before':
          teamTopology === teamTopologyEnum.COMPLICATED_SUBSYSTEM
            ? {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: teamTopologyColor[teamTopology].color,
                clipPath: clipPathBorder,
              }
            : {},
      }}
    >
      {label}
    </Box>
  );
};

export default TeamShape;
