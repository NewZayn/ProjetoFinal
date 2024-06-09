// bookdetails.jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex, Button, VStack, HStack, Badge, Divider, Center, Stack } from '@chakra-ui/react';
import ErrorBoundary from './ErrorBoundary';
import { fetchBookById } from "../interface/book.js";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

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
        window.open(book.pdfPath, '_blank');
    };

    return (
        <ErrorBoundary>
            <Flex direction="column" align="center" p={8}>
                <Box bg="white" p={8} width="100%" maxWidth="1200px" rounded="md" shadow="md" color="gray.500" border="1px solid gray.900">
                    <Heading mb={4}>{book.title}</Heading>
                    <Divider mb={4} />
                    <VStack spacing={4} align="stretch">
                        <Box p={4} borderWidth="1px" borderRadius="md">
                            <Stack spacing={2} align="center">
                                <Image src={book.coverImage} alt={book.title} boxSize="150px" objectFit="cover" />
                                <Text fontWeight="bold">{book.title}</Text>
                                <HStack spacing={4}>
                                    <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={handleReadOnline}>Ler online</Button>
                                    <Button colorScheme="purple" leftIcon={<AddIcon />}>Adicionar à Estante</Button>
                                    <Button colorScheme="purple" leftIcon={<DownloadIcon />} onClick={() => window.open(book.pdfPath)}>Descarregar</Button>
                                </HStack>
                            </Stack>
                        </Box>
                        <HStack spacing={4}>
                            <Badge colorScheme="blue">MUPO</Badge>
                            <Text>Este título tem acesso multiusuário.</Text>
                        </HStack>
                        <Box>
                            <Heading size="md" mb={2}>Disponibilidade para download</Heading>
                            <Text>Os downloads do dia foram <strong>{book.downloadAvailableToday}</strong> Disponível(is)</Text>
                            <Text>Os downloads disponíveis para uso durante o mês são <strong>{book.downloadAvailableThisMonth}</strong> Disponível(is)</Text>
                        </Box>
                        <Box>
                            <Heading size="md" mb={2}>Informações bibliográficas</Heading>
                            <Text><strong>Autor:</strong> {book.author}</Text>
                            <Text><strong>Editora:</strong> {book.publisher}</Text>
                            <Text><strong>Edição:</strong> {book.year}</Text>
                            <Text><strong>Idioma:</strong> Portuguese</Text>
                            <Text><strong>Número de Páginas:</strong> {book.pages}</Text>
                        </Box>
                    </VStack>
                    <Center mt={6} height={400} justifyContent="space-between">
                        <Button colorScheme="purple" mr={2}>Obter citação</Button>
                    </Center>
                </Box>
            </Flex>
        </ErrorBoundary>
    );
};

export default BookDetails;
