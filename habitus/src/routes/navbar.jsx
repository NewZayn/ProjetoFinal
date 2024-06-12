
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Center,
  Button,
  IconButton,
  Text,
  Avatar, VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AuthContext } from '../authcontext.jsx';


const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

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
              <Link as={RouterLink} to="/about" color="white" _hover={{ bg: 'blue.400' }}>
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
              {!user ? (<>
                    <Link as={RouterLink} to="/login" color="white" _hover={{ bg: 'blue.400' }}>
                      Login
                    </Link>
                    <Link as={RouterLink} to="/register" color="white" _hover={{ bg: 'blue.400' }}>
                      Sign Up
                    </Link>
                  </>
              ) : (
                  <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<Avatar size="sm" name={user.name} />}
                        variant="link"
                        color="white"
                        _hover={{ bg: 'blue.400' }}
                    />
                    <VStack
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2">
                      <Text fontSize="sm">{user.name}</Text>
                      <Text fontSize="xs" color="gray.600">
                        {user.status}
                      </Text>
                    </VStack>
                    <MenuList>
                      <MenuItem as={RouterLink} to="/profile">Meu Perfil</MenuItem>
                      <MenuItem as={RouterLink} to="/mybookcase">Minha Estante</MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={logout}>Sair</MenuItem>
                    </MenuList>
                  </Menu>
              )}
            </HStack>
          </HStack>
        </Flex>
      </Box>
  );
};

export default Navbar;
