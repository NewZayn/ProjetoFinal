// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Box, Heading, Grid, GridItem, SimpleGrid} from '@chakra-ui/react';
import BookCard from './components/book.jsx';
import { fetchBookByCategory } from '../script/Book.js';

const CategoryPage = () => {
    const { category } = useParams();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookByCategory(category)
            .then(response => {
                setBooks(response);
            })
            .catch(error => {
                setError('Erro ao buscar livros da categoria: ' + error.message);
            });
    }, [category]);

    return (
        <Box>
            <Heading size="lg" mt={4} mb={4}>
                {category}
            </Heading>
            <Box justifyContent="center" mt={4} alignItems="center" mt={4}>
                {error && <Box color="red.500">{error}</Box>}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    {books.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default CategoryPage;
