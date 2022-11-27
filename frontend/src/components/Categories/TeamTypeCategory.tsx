import * as React from 'react';
import { Chip } from '@mui/material';
import { teamType as teamTypeEnum, teamTypeColor } from '../../types/teamTypes';

interface ITeamTypeCategoryProps {
  teamType: teamTypeEnum;
}

const TeamTypeCategory: React.FC<ITeamTypeCategoryProps> = ({
  teamType,
}: ITeamTypeCategoryProps) => {
  let teamTypeDisplay = teamType.toString();
  if (teamType === teamTypeEnum.STREAM_ALIGNED) {
    teamTypeDisplay = 'stream-aligned';
  }
  if (teamType === teamTypeEnum.COMPLICATED_SUBSYSTEM) {
    teamTypeDisplay = 'complicated subsystem';
  }
  if (teamType === teamTypeEnum.UNDEFINED) {
    teamTypeDisplay = 'undefined type';
  }

  return (
    <Chip
      label={teamTypeDisplay}
      sx={{
        color: 'black',
        borderColor: teamTypeColor[teamType].color,
        backgroundColor: teamTypeColor[teamType].backgroundColor,
      }}
      variant="outlined"
    />
  );
};

export default TeamTypeCategory;
