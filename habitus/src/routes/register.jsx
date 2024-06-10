// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Stack, Link } from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { register } from '../script/Authenticate.js';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            await register(formData);
            navigate('/');
        } catch (error) {
            console.error('Erro ao registrar:', error);
        }
    };

    return (
        <Flex align="center" justify="center">
            <Box bg="white" p={50} rounded="md" shadow="md" >
                <Heading mb={6} textAlign="center">Sign Up</Heading>
                <Stack spacing={4}>
                    <Input
                        placeholder="Nome de Usuário"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button colorScheme="teal" onClick={handleRegister}>Registrar</Button>
                </Stack>
                <Box mt={4} textAlign="center">
                    <Link as={RouterLink} to="/" color="teal.500">Já tem uma conta? Faça login</Link>
                </Box>
            </Box>
        </Flex>
    );
}

export default Register;
