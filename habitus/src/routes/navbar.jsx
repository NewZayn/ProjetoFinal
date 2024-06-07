import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Center,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login';
import LogoutButton from './login';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Heading color="white">
            <Center>Alexandria</Center>
          </Heading>
        </Box>

        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/" color="white" _hover={{ bg: 'blue.400' }}>
              Home
            </Link>
            <Link as={RouterLink} to="/sobre" color="white" _hover={{ bg: 'blue.400' }}>
              Sobre
            </Link>
            <Menu isOpen={isCategoryOpen}>
        <MenuButton
          as={Button}
          colorScheme="blue"
          rightIcon={<ChevronDownIcon />}
          onClick={handleCategoryClick}
          _hover={{ bg: 'blue.400' }}
        >
          Categorias
          </MenuButton>
          <MenuList>
            <MenuGroup title="Ficção">
              <MenuItem as={RouterLink} to="/ficcao/fantasia">Fantasia</MenuItem>
              <MenuItem as={RouterLink} to="/ficcao/sci-fi">Ficção Científica</MenuItem>
              <MenuItem as={RouterLink} to="/ficcao/romance">Romance</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Não Ficção">
              <MenuItem as={RouterLink} to="/nao-ficcao/historia">História</MenuItem>
              <MenuItem as={RouterLink} to="/nao-ficcao/ciencia">Ciência</MenuItem>
              <MenuItem as={RouterLink} to="/nao-ficcao/biografia">Biografia</MenuItem>
            </MenuGroup>
           </MenuList>
           </Menu>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
