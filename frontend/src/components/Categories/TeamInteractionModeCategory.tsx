import * as React from 'react';
import { Chip } from '@mui/material';
import {
  interactionMode as interactionModeEnum,
  interactionModeColor,
} from '../../types/interactionTypes';

interface ITeamInteractionModeCategoryProps {
  interactionMode: interactionModeEnum;
}

const TeamInteractionModeCategory: React.FC<
  ITeamInteractionModeCategoryProps
> = ({ interactionMode }: ITeamInteractionModeCategoryProps) => {
  let interactionModeDisplay = interactionMode.toString();
  if (interactionMode === interactionModeEnum.X_AS_A_SERVICE) {
    interactionModeDisplay = 'x-as-a-service';
  }

  return (
    <Chip
      label={interactionModeDisplay}
      sx={{
        color: 'black',
        borderColor: interactionModeColor[interactionMode].color,
        backgroundColor: interactionModeColor[interactionMode].backgroundColor,
        border: '1px dashed',
      }}
      variant="outlined"
      size="small"
    />
  );
};

export default TeamInteractionModeCategory;
