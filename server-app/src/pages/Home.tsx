// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Container,
  Box,
  Paper,
  useTheme,
} from '@mui/material';

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to My Application
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Please register or log in to continue.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/register"
            size="large"
            sx={{ mr: 2 }}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/login"
            size="large"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
