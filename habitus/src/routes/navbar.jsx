
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useState, useContext, useCallback} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
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
  Button,
  IconButton,
  Text,
  Avatar, VStack, Center, Input, List, ListItem, Badge,
} from '@chakra-ui/react';
import {ChevronDownIcon, Search2Icon} from '@chakra-ui/icons';
import { AuthContext } from '../authcontext.jsx';
import './style/index.css';
import {fetchBooksByTitle} from "../script/Book.js";
import debounce from 'lodash.debounce';



const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const searchBooks = async (title) => {
    try {
      const response = await fetchBooksByTitle(title);
      setSuggestions(response);
    } catch (error) {
      console.error('Erro ao buscar sugestões: ', error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(searchBooks, 300), []);

  const handleSuggestionClick = (title) => {
    navigate(`/search?q=${title}`);
  };
  return (
      <Box bg="blue.500" px={4}>
        <Flex h={20}  justifyContent="space-between" direction="row" borderBottom={1}
              align={'center'} alignItems={"center"}>
          <Box>
            <Heading color="white" paddingLeft={40}>
              <Text fontFamily="
                    'Poppins',
                    sans-serif"
                    color={"gray.300"}
              >Alexandria</Text>
            </Heading>
          </Box>
          <Flex  alignItems="center" justifyContent="space-between">
            <Center>
              <Box position="relative" w="100%" >
                <Input
                    placeholder="Procurar livros..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    bg="gray.100"
                    _placeholder={{ color: 'grey.100' }}
                    width={500}
                />
                {suggestions.length > 0 && (
                    <List position="absolute" bg="white" zIndex="1" w="100%" >
                      {suggestions.map((book) => (
                          <ListItem
                              key={book.id}
                              onClick={() => handleSuggestionClick(book.title)}
                              cursor="pointer"
                              _hover={{ backgroundColor: 'gray.200' }}
                          >
                            <Box >
                              {<Search2Icon />}
                              {book.title}
                            </Box>

                            <Box
                                height="1px"
                                width="100%"
                                background="blue.500"
                            ></Box>
                          </ListItem>
                      ))}
                    </List>
                )}
              </Box>
            </Center>
          </Flex>

          <HStack spacing={8} alignItems="center" >
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link as={RouterLink} to="/" color="white" fontFamily={"Poppins"} fontWeight={600} >
                Home
              </Link>
              <Link as={RouterLink} to="/about" color="white" fontFamily={"Poppins"} fontWeight={600} >
                Sobre
              </Link>
              <Menu isOpen={isCategoryOpen} >
                <MenuButton
                    as={Button}
                    colorScheme="blue"
                    rightIcon={<ChevronDownIcon />}
                    onClick={handleCategoryClick}
                    _hover={{ bg: 'blue.400' }}
                >
                  <Text fontFamily="Poppins" >Categorias</Text>
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
                        icon={<Avatar size="sm" name={user.name} fontFamily={"Poppins"}/>}
                        fontFamily={"Poppins"}
                        variant="link"
                        color="white"
                        _hover={{ bg: 'blue.400' }}
                    />
                    <VStack
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2">
                      <Text fontSize="sm" fontFamily={"Poppins"} >{user.name} </Text>
                      <Text fontSize="xs" color="gray.600">
                        <Badge colorScheme="green" fontFamily={"Poppins"}>Admin</Badge>
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
