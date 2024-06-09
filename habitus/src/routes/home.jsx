// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import {Box, Input, Heading, VStack, Center} from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from './components/book.jsx';
import '../index.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [top10Books, setTop10Books] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/books/findAll');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError('Error fetching books: ' + error.message);
      }
    };

    const fetchTop10Books = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/books/top10');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTop10Books(data);
      } catch (error) {
        setError('Error fetching top 10 books: ' + error.message);
      }
    };

    fetchBooks();
    fetchTop10Books();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sliderSettings = {
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

  const top10SliderSettings = {
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

        <Box>
        <Center padding={10}>
          <Input
              placeholder="Procurar livros..."
              value={searchTerm}
              onChange={handleSearchChange}
              borderRadius="full"
              bg="gray.100"
              _placeholder={{ color: 'grey.100' }}
              width={{ base: '90%', md: '50%' }}
              mb={4}
          />
        </Center>
            <VStack spacing={4} align="stretch"  direction="row">
              {error && <Box color="red.500">{error}</Box>}
              <Heading size="lg" mt={4} mb={4}>
                Novo
              </Heading>
              <Box className="slider-container">
                <Slider {...sliderSettings}>
                  {filteredBooks.map((book) => (
                      <Box key={book.id} className="slide-item" alignItems="center" justifyContent="space-around" direction="row" mt={4}>
                        <BookCard book={book} />
                      </Box>
                  ))}
                </Slider>
              </Box>
              <Heading size="lg" mt={8} mb={4}>
                Top 10 Livros
              </Heading>
              <Box className="slider-container">
                <Slider {...top10SliderSettings}>
                  {top10Books.map((book) => (
                      <Box key={book.id} className="slide-item">
                        <BookCard book={book} />
                      </Box>
                  ))}
                </Slider>
              </Box>
            </VStack>

      </Box>
  );
};

export default Home;
