import * as React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { sidebarWidth } from '../../constants/sizes';

interface IActionWrapperBottomProps {
  children: React.ReactNode | React.ReactNode[];
}

const ActionWrapperBottom: React.FC<IActionWrapperBottomProps> = ({
  children,
}: IActionWrapperBottomProps) => {
  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={{
        top: 'auto',
        bottom: 0,
        width: { sm: `calc(100% - ${sidebarWidth}px)` },
        ml: { sm: `${sidebarWidth}px` },
      }}
    >
      <Toolbar sx={{ py: 3, justifyContent: 'right' }}>{children}</Toolbar>
    </AppBar>
  );
};

export default ActionWrapperBottom;
