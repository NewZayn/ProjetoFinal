import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (
    <Box>
      <Navbar />
      <Box p={46}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;

