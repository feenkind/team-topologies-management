import * as React from 'react';
import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import MenuIcon from '@mui/icons-material/Menu';

interface ILayoutProps {
  activeHeaderMenuItem?: string;
  activeSidebarMenuItem?: string;
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({
  activeHeaderMenuItem,
  activeSidebarMenuItem,
  children,
}: ILayoutProps) => {
  const drawerWidth = '250';
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
          <Sidebar />
        </Drawer>
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
          <Sidebar />
        </Drawer>
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
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
