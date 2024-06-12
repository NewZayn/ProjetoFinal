// src/routes/SearchResults.jsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Button, Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import BookCard from './components/book.jsx';
import { fetchBooksByTitle } from '../script/Book.js';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery();
    const searchTerm = query.get('q') || '';
    const [books, setBooks] = useState([]);
    const [currentPage] = useState(1);
    const booksPerPage = 6;

    useEffect(() => {
        if (searchTerm) {
            fetchBooksByTitle(searchTerm)
                .then(response => setBooks(response))
                .catch(error => console.error('Erro ao buscar livros: ' + error.message));
        }
    }, [searchTerm]);

    const currentBooks = books.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

    return (
        <Box p={4}>
            <Heading size="lg" mb={4}>Resultados da Pesquisa: {searchTerm}</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {currentBooks.map((book) => (
                    <GridItem key={book.id}>
                        <BookCard book={book} />
                    </GridItem>
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
            </Box>
        </Box>
    );
};

export default SearchResults;
