import React, { ReactNode } from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <CssBaseline />
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
              Corom test
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
