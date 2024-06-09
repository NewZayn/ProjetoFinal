// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Box, Center, Image, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const BookCard = ({ book }) => {
    console.log("Book data: ", book);
    return (
        <Center maxW="260px" borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" m={2}>
            <LinkBox as="article">
                <Image src={book.image} alt={book.title} /> {/* Use book.image */}
                <Box p="5">
                    <LinkOverlay as={RouterLink} to={`/bookdetails/${book.id}`}>
                        <Heading size="md" mt={2}>{book.title}</Heading>
                    </LinkOverlay>
                    <Text mt={1}>Autor: {book.author}</Text>
                    {book.publisher && <Text>Editora: {book.publisher}</Text>}
                    {book.year && <Text>Ano: {book.year}</Text>}
                </Box>
            </LinkBox>
        </Center>
    );
};

export default BookCard;
