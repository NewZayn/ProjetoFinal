// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './routes/navbar';
import Footer from './routes/footer';

function App() {
    return (
        <Box display="flex" flexDirection="column" minH="100vh" justifyContent="space-between">
            <Navbar p={4} /> {/* Adicione padding ao Navbar */}
            <Box flex="1" p={150} bg={"rgba(249,249,249,255)"}>
                <Container maxW="container.lg">
                    <Outlet />
                </Container>
            </Box>
            <Footer p={300} /> {/* Adicione padding ao Footer */}
        </Box>
    );
}

export default App;

