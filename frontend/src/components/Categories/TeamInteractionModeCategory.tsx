import * as React from 'react';
import { Chip } from '@mui/material';
import {
  interactionMode as interactionModeEnum,
  interactionModeColor,
} from '../../constants/categories';

interface ITeamInteractionModeCategoryProps {
  interactionMode: interactionModeEnum;
}

const TeamInteractionModeCategory: React.FC<
  ITeamInteractionModeCategoryProps
> = ({ interactionMode }: ITeamInteractionModeCategoryProps) => {
  return (
    <Chip
      label={interactionMode}
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
