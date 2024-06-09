import { Box, Flex, Heading, Input, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { loginUser } from '../interface/auth.js';
import { AuthContext } from '../authcontext.jsx';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = { email, password };
            const userDTO = await loginUser(credentials);
            login(userDTO);
            navigate('/profile');
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
            console.error(err);
        }
    };

    return (
        <Flex align="center" justify="center" height="400px">
            <Box bg="white" p={8} rounded="md" shadow="md">
                <Heading mb={6} textAlign="center">Login</Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" colorScheme="teal">Entrar</Button>
                    </Stack>
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                </form>
            </Box>
        </Flex>
    );
}

export default Login;
