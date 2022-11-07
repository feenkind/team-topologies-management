import * as React from 'react';
import { ListItemButton, ListItemText, Typography } from '@mui/material';

interface INavHeadlineProps {
  text: string;
}

const NavHeadline: React.FC<INavHeadlineProps> = ({
  text,
}: INavHeadlineProps) => {
  return (
    <ListItemButton disabled={true}>
      <ListItemText>
        <Typography variant="button">{text}</Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default NavHeadline;
