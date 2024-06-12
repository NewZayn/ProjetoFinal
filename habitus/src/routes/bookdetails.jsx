// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex, Button, VStack, HStack, Badge, Divider, Stack } from '@chakra-ui/react';
import ErrorBoundary from './ErrorBoundary';
import { fetchBookById } from "../script/Book.js";
import { AddIcon, DownloadIcon, Search2Icon } from "@chakra-ui/icons";
import { addFavorite } from "../script/Favorite.js";
import { AuthContext } from '../authcontext';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const { user } = useContext(AuthContext);
// Get the user from AuthContext

    useEffect(() => {
        const getBook = async () => {
            const data = await fetchBookById(id);
            setBook(data);
        };
        getBook();
    }, [id]);

    if (!book) {
        return <Text>Loading...</Text>;
    }

    const handleReadOnline = () => {
        window.open(book.pdf, '_blank');
    };

    const handleAddToShelf = async () => {
        try {
            const favoriteDTO = { bookId: book.id };
            await addFavorite(user.id, favoriteDTO);
            alert('Livro adicionado à estante com sucesso!');
        } catch (error) {
            alert('Erro ao adicionar livro à estante: ' + error.message);
        }
    };

    const statusText = book.status === null ?  book.status : "Público";
    console.log(book.status)

    return (
        <ErrorBoundary>
            <Flex direction="column" align="center" p={8}>
                <Box bg="white" p={8} width="100%" maxWidth="1200px" rounded="md" shadow="md" color="gray.500" >
                    <Heading mb={4}>{book.title}</Heading>
                    <Divider mb={4} />
                    <VStack spacing={4} align="stretch">
                        <Box p={4} borderWidth="1px" borderRadius="md">
                            <Stack spacing={2} align="center" color={"blue.300"}>
                                <Image src={book.image} alt={book.title} boxSize="150px" objectFit="cover" />
                                <Text fontWeight="bold">{book.title}</Text>
                                <HStack spacing={4}>
                                    <Button colorScheme="purple" leftIcon={<Search2Icon />} onClick={handleReadOnline}>Ler online</Button>
                                    <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={handleAddToShelf}>Adicionar à Estante</Button>
                                    <Button colorScheme="purple" leftIcon={<DownloadIcon />} onClick={() => window.open(book.pdf)}>Download</Button>
                                </HStack>
                            </Stack>
                        </Box>
                        <HStack spacing={4}>
                            <Badge colorScheme={book.status === null ? "gray" : "blue"}>{statusText}</Badge>                            <Text>Este título tem acesso multiusuário.</Text>
                        </HStack>
                        <Box>
                            <Heading size="md" mb={2}>Disponibilidade para download</Heading>
                            <Text>Os downloads do dia foram <strong>{book.downloadAvailableToday}</strong> Disponível(is)</Text>
                            <Text>Os downloads disponíveis para uso durante o mês são <strong>{book.downloadAvailableThisMonth}</strong> Disponível(is)</Text>
                        </Box>
                        <Box>
                            <Heading size="md" mb={2}>Informações bibliográficas</Heading>
                            <Text><strong>Autor:</strong> {book.author}</Text>
                            <Text><strong>Editora:</strong> {book.author}</Text>
                            <Text><strong>Edição:</strong> {book.publishedDate}</Text>
                            <Text><strong>Categoria:</strong> {book.category}</Text>
                            <Text><strong>Publicado no site em:</strong> {book.userPublicationDate}</Text>
                            <Text><strong>Idioma:</strong> Portuguese</Text>
                            <Text><strong>Número de Páginas:</strong> {book.pages}</Text>
                        </Box>
                    </VStack>
                </Box>
            </Flex>
        </ErrorBoundary>
    );
};

export default BookDetails;
