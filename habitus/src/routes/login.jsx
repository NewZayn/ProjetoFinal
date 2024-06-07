import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      bg="blue.500"
      color="white"
      _hover={{ bg: 'blue.400' }}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
