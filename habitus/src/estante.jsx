// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text, Image, Flex, Link, Button } from '@chakra-ui/react';
import { fetchFavoriteBooks } from './interface/favoritos.js'; // Importing the fetch function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const MinhaEstante = () => {
    const navigate = useNavigate(); // Get useNavigate hook
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            setError(null); // Reset error before fetching
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const books = await fetchFavoriteBooks(userId);
                    setFavoriteBooks(books);
                }
            } catch (error) {
                console.error('Error fetching favorite books:', error);
                setError('Erro ao carregar sua estante.'); // User-friendly error message
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <Flex  justify="center" alignItems="center" direction="column">
            <Box p={5} bg="white" shadow={'-moz-initial'} border="1px solid gray.900 ">
                <Heading mb={5}>Minha Estante</Heading>
                <Flex justify="space-between" mb={4}>
                    {isLoading ? (
                        <Text>Carregando sua estante...</Text>
                    ) : error ? (
                        <Text color="red.500">{error}</Text>
                    ) : favoriteBooks.length === 0 ? (
                        <Text>Sua estante está vazia.</Text>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                            {favoriteBooks.map(book => (
                                <Link key={book.id} href={`/books/${book.id}`}>
                                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                                        <Image src={book.coverUrl} alt={book.title} />
                                        <Box p={6}>
                                            <Text fontWeight="bold" fontSize="xl">{book.title}</Text>
                                            <Text mt={2}>{book.author}</Text>
                                        </Box>
                                    </Box>
                                </Link>
                            ))}
                        </SimpleGrid>
                    )}
                </Flex>
                <Button colorScheme="teal" onClick={() => navigate('/addbook')}>Criar Livro</Button>
            </Box>
        </Flex>
    );
};

export default MinhaEstante;
