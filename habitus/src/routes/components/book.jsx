import React from 'react';
import { Box, Center, Image, Heading, Text } from '@chakra-ui/react';

const BookCard = ({ book }) => {
  return (
    <Center maxW="320px" borderWidth="1px" borderRadius="md" overflow="hidden">
      <Box p="5">
        <Image src={book.coverImage} alt={book.title} />
        <Heading size="md" mt={2}>
          {book.title}
        </Heading>
        <Text mt={1}>Autor: {book.author}</Text>
        {book.publisher && <Text>Editora: {book.publisher}</Text>}
        {book.year && <Text>Ano: {book.year}</Text>}
      </Box>
    </Center>
  );
};

export default BookCard;
