import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  return (
    <Box>
      <Heading>Books List</Heading>
      <List mt={4}>
        {books.map((book, index) => (
          <ListItem key={index} py={2} px={4} border="1px solid #ddd" borderRadius="md" mb={2}>
            {book}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Books;
