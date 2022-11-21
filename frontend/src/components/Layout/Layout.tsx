import * as React from 'react';
import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import Logo from '../Header/Logo';
import { useState } from 'react';

interface ILayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  errorDisplay: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({
  header,
  sidebar,
  errorDisplay,
}: ILayoutProps) => {
  const drawerWidth = '280';
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
          width: `${drawerWidth}px`,
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
          width: `${drawerWidth}px`,
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 1,
        }}
      >
        {headerToolbar}
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {mobileSidebar}
        {desktopSidebar}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        {errorDisplay}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
