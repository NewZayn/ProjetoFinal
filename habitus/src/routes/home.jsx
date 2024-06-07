import React, { useState } from 'react';
import { Box, Input, Heading, VStack, Center, Image } from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import BookCard from './components/book';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const books = [
    {
      id: 1,
      title: 'O Senhor dos Anéis',
      author: 'J.R.R. Tolkien',
      coverImage: 'src/assets/g.jpg',
      publisher: 'Allen & Unwin',
      year: 1954,
    },
    {
      id: 2,
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J.K. Rowling',
      coverImage: 'src/assets/g.jpg',
      publisher: 'Bloomsbury',
      year: 1997,
    },
    
  ];

  const top10Books = [
  
    {
      id: 1,
      title: 'O Senhor dos Anéis',
      author: 'J.R.R. Tolkien',
      coverImage: 'src/assets/g.jpg',
    },
   
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const top10Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box >
      <VStack spacing={4} align="stretch">
        <Center>
          <Input
            placeholder="Procurar livros..."
            value={searchTerm}
            onChange={handleSearchChange}
            borderRadius="full"
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            width={{ base: '90%', md: '50%' }} 
            mb={4}
          />
        </Center>


        <Heading size="lg" mt={4} mb={4}>
          Novo
        </Heading>

        <Slider {...settings}>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} /> 
          ))}
        </Slider>

        <Heading size="lg" mt={8} mb={4}>
          Top 10 Livros
        </Heading>

        <Slider {...top10Settings}>
          {top10Books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Slider>

        <Heading size="lg" mt={8} mb={4}>
            Categorias
        </Heading>

        <Slider {...top10Settings}>
          {top10Books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Slider>
      </VStack>
    </Box>
  );
}

export default Home;


