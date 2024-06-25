// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {Box, Center, Image, Heading, Text, LinkBox, LinkOverlay, Flex , Badge} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const BookImage = ({ image, title }) => (
    <Image
        py={2}
        src={image}
        alt={title}
        height="220px"
        width="240px" // Defina a largura desejada
        objectFit="contain" // Ajusta o conteúdo da imagem
    />
);

// eslint-disable-next-line react/prop-types
const BookCard = ({ book }) => {
    console.log("Book data: ", book);
    return (
        <Center maxW="260px" borderRadius="md" overflow="hidden" bg="white" >
            <LinkBox as="article">
                <Box >
                    <BookImage key={book.id} image={book.image} title={book.title}  />
                    <Flex flexDirection="column" justifyContent="space-between" >

                    <LinkOverlay as={RouterLink} to={`/bookdetails/${book.id}`}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <Heading size="md" paddingTop={3} fontSize={15} isTruncated maxW="200px">{book.title} </Heading >
                        <Text color="grey" size="md" fontSize={13} isTruncated maxW="200px">Autor: {book.author} </Text>

                    </LinkOverlay>
                        <Flex>
                            <Text  fontSize={10} fontWeight={600} color="green" borderRadius={5} shadow="initial">Público</Text>
                        </Flex>
                    {book.publisher && <Text>Editora: {book.publisher}</Text>}
                    {book.year && <Text>Ano: {book.year}</Text>}
                    </Flex>
                </Box>
            </LinkBox>
        </Center>
    );
};

export default BookCard;
