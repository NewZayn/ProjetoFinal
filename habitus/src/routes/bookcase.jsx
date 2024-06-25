// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Box, Heading, SimpleGrid, Text, Flex, Button, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BookCard from "../routes/components/book.jsx";
import { fetchCreatedBooks } from '../script/Book.js';
import { fetchFavorites } from "../script/Favorite.js";
import { AuthContext } from "../authcontext.jsx";

const BookCase = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [createdBooks, setCreatedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCreatedBooks, setShowCreatedBooks] = useState(false);
    const [currentSection, setCurrentSection] = useState('favorites');

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (user && user.id) {
                    const books = await fetchFavorites(user.id);
                    setFavoriteBooks(books);
                    setShowCreatedBooks(false);
                } else {
                    setError('User ID não encontrado.');
                }
            } catch (error) {
                console.error('Error fetching favorite books:', error);
                setError('Erro ao carregar sua estante.');
            } finally {
                setIsLoading(false);
            }
        };

        if (user && !showCreatedBooks) {
            fetchBooks().then(() => console.log("books found"));
        }
    }, [user, showCreatedBooks]);

    const handleFetchCreatedBooks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (user && user.id) {
                const books = await fetchCreatedBooks(user.id);
                setCreatedBooks(books);
                setShowCreatedBooks(true);
                setCurrentSection('createdBooks');
            } else {
                setError('User ID não encontrado.');
            }
        } catch (error) {
            console.error('Error fetching created books:', error);
            setError('Error uploaded books.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchFavorites = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (user && user.id) {
                const books = await fetchFavorites(user.id);
                setFavoriteBooks(books);
                setShowCreatedBooks(false);
                setCurrentSection('favorites');
            } else {
                setError('User ID não encontrado.');
            }
        } catch (error) {
            console.error('Error fetching favorite books:', error);
            setError('Erro ao carregar sua estante.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Flex justify="center" alignItems="center" direction="column" p={5} bg="gray.50">
            <Box bg="white" p={8} width="100%" maxWidth="1200px" rounded="md" shadow="md" color="gray.500" border="1px solid gray.900">
                <Heading mb={5}>Minha Estante</Heading>
                <Text mb={5}>
                    Bem-vindo à sua estante pessoal!
                </Text>
                <Flex justify="space-between" mb={4}>
                    <Button colorScheme="teal" onClick={() => navigate('/addbook')}>Criar Livro</Button>
                    <Button
                        colorScheme={currentSection === 'createdBooks' ? 'green' : 'blue'}
                        onClick={handleFetchCreatedBooks}
                        ml={4}
                    >
                        Meus Livros Criados
                    </Button>
                    <Button
                        colorScheme={currentSection === 'favorites' ? 'green' : 'blue'}
                        onClick={handleFetchFavorites}
                        ml={4}
                    >
                        Minha Estante
                    </Button>
                </Flex>
                <Divider mb={5} />
                {isLoading ? (
                    <Text>Carregando sua estante...</Text>
                ) : error ? (
                    <Text color="red.500">{error}</Text>
                ) : (
                    <Box>
                        <Heading size="md" mb={4}>
                            {showCreatedBooks ? "Meus Livros Criados" : "Meus Livros Favoritos"}
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                            {(showCreatedBooks ? createdBooks : favoriteBooks).map(book => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </SimpleGrid>
                    </Box>
                )}
                {/* eslint-disable-next-line no-undef */}
                <Divider mb={5} paddingTop={5}/>

                <Flex borderEndRadius="1px solid gray.500">
                    <Box height={100} backgroundcolor="red">
                        <Heading>Histórico</Heading>
                        <Text mb={5} paddingTop={10}>
                            Nenhuma atividida registrada
                        </Text>

                    </Box>
                </Flex>
            </Box>

        </Flex>


    );
};

export default BookCase;
