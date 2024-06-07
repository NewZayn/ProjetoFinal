import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './routes/navbar';
import Footer from './routes/footer';


function App() {
  return (
    <Box>
      <Navbar />
      <Box p={300}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;

