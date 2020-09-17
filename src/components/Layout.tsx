import {
  AppBar,
  Container,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';

export type LayoutProps = { title?: string };

const Layout: React.FC<LayoutProps> = ({ children, title = 'TODO APP' }) => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: '#fafafa' }}
  >
    <AppBar color="primary" position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64 }}>
        <Typography color="inherit">{title}</Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="md">{children as any}</Container>
  </Paper>
);

export default Layout;
