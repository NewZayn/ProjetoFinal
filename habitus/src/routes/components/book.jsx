// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Box, Center, Image, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const BookImage = ({ image, title }) => (
    <Image
        src={image}
        alt={title}
        height="220px"
        width="200px" // Defina a largura desejada
        objectFit="cover" // Ajusta o conteúdo da imagem
    />
);

// eslint-disable-next-line react/prop-types
const BookCard = ({ book }) => {
    console.log("Book data: ", book);
    return (
        <Center maxW="260px" borderRadius="md" overflow="hidden" bg="white" m={2}>
            <LinkBox as="article">
                <BookImage key={book.id} image={book.image} title={book.title} />
                <Box p="5">
                    <LinkOverlay as={RouterLink} to={`/bookdetails/${book.id}`}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <Heading size="md" mt={2} isTruncated maxW="200px">{book.title}</Heading>
                    </LinkOverlay>
                    <Text mt={1} color={"grey.100"} isTruncated maxW="200px">Autor: {book.author}</Text>
                    <Text mt={2} fontSize={13} color={"green.400"}>Public</Text>
                    {book.publisher && <Text>Editora: {book.publisher}</Text>}
                    {book.year && <Text>Ano: {book.year}</Text>}
                </Box>
            </LinkBox>
        </Center>
    );
};

export default BookCard;
