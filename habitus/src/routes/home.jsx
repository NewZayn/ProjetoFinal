// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Input, Heading, VStack, Center } from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from './components/book.jsx';
import CategoryCard from './components/category.jsx';
import '../index.css';
import { fetchBooks, fetchTop10Books, fetchBooksByTitle } from '../script/Book.js';

const debounce = (func, delay) => {
  let debounceTimer;
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

const categories = [
  { name: 'Romance', image: 'src/assets/images.jpeg' },
  { name: 'Ficção Científica', image: 'src/assets/ficção.jpeg' },
  { name: 'Fantasia', image: 'src/assets/aventura.jpeg' },
  { name: 'Biografia', image: 'src/assets/g.jpg' },
  { name: 'História', image: 'src/assets/l.jpg' },
  { name: 'Mistério', image: 'src/assets/p.jpg' },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [top10Books, setTop10Books] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks()
        .then(response => {
          setBooks(response);
        })
        .catch(error => {
          setError('Erro ao buscar livros: ' + error.message);
        });

    fetchTop10Books()
        .then(response => {
          setTop10Books(response);
        })
        .catch(error => {
          setError('Erro ao buscar top 10 livros: ' + error.message);
        });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const searchBooks = async (title) => {
    try {
      const response = await fetchBooksByTitle(title);
      setBooks(response);
    } catch (error) {
      setError('' + error.message);
    }
  };

  const debouncedSearch = useCallback(debounce(searchBooks, 300), []);

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
        <VStack spacing={4} align="stretch">
          {error && <Box color="red.500">{error}</Box>}
          <Heading size="lg" mt={4} mb={4}>
            Novo
          </Heading>
          <Box className="slider-container">
            <Slider {...sliderSettings}>
              {filteredBooks.map((book) => (
                  <Box key={book.id} className="slide-item" alignItems="center" justifyContent="space-around" mt={4}>
                    <BookCard book={book} />
                  </Box>
              ))}
            </Slider>
          </Box>
          <Heading size="lg" mt={4} mb={4}>
            Top 10 Livros
          </Heading>
          <Box className="slider-container">
            <Slider {...top10SliderSettings}>
              {top10Books.map((book) => (
                  <Box key={book.id} className="slide-item" alignItems="center" justifyContent="space-around" mt={4}>
                    <BookCard book={book} />
                  </Box>
              ))}
            </Slider>
          </Box>
          <Heading size="lg" mt={4} mb={4}>
            Categorias
          </Heading>
          <Box className="slider-container">
            <Slider {...sliderSettings}>
              {categories.map(category => (
                  <CategoryCard key={category.name} category={category.name} image={category.image} />
              ))}
            </Slider>
          </Box>
        </VStack>
      </Box>
  );
};

export default Home;

