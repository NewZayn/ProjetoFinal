// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Button } from '@chakra-ui/react';
import BookCard from './components/book.jsx';

// eslint-disable-next-line react/prop-types
const BookList = ({ books, booksPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line react/prop-types
    const totalPages = Math.ceil(books.length / booksPerPage);

    // eslint-disable-next-line react/prop-types
    const currentBooks = books.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

    return (
        <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {currentBooks.map((book) => (
                    <GridItem key={book.id}>
                        <BookCard book={book} />
                    </GridItem>
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
                <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </Button>
                <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próximo
                </Button>
            </Box>
        </Box>
    );
};

export default BookList;
