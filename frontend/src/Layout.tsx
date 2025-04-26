import React, { ReactNode } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  CssBaseline,
} from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <CssBaseline />
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            paddingTop: '64px',
            boxSizing: 'border-box',
            height: '100vh',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItemButton component="a" href="#">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component="a" href="#">
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton component="a" href="#">
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <AppBar
          position="fixed"
          sx={{ width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Application
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Body content */}
        <Box
          sx={{
            marginTop: '64px',
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
