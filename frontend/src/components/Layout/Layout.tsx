import * as React from 'react';
import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../Header/Logo';
import { useState } from 'react';
import { sidebarWidth } from '../../constants/sizes';

interface ILayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  errorDisplay: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<ILayoutProps> = ({
  header,
  sidebar,
  errorDisplay,
  children,
}: ILayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const headerToolbar = (
    <Toolbar
      sx={{
        backgroundColor: 'background.paper',
        color: 'primary.dark',
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Logo />
        </Box>
      </Box>
      {header}
    </Toolbar>
  );

  const mobileSidebar = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: `${sidebarWidth}px`,
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText',
        },
      }}
    >
      {sidebar}
    </Drawer>
  );

  const desktopSidebar = (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: `${sidebarWidth}px`,
        },
      }}
      open
      PaperProps={{
        sx: {
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText',
        },
      }}
    >
      {sidebar}
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          ml: { sm: `${sidebarWidth}px` },
          boxShadow: 1,
        }}
      >
        {headerToolbar}
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
      >
        {mobileSidebar}
        {desktopSidebar}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
        }}
      >
        <Toolbar />
        {errorDisplay}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
