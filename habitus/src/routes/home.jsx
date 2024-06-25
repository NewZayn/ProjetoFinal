// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import {Box, Heading, VStack, Center, Text, Flex, Button} from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from './components/book.jsx';
import CategoryCard from './components/category.jsx';
import './style/index.css';
import { fetchBooks, fetchTop10Books } from '../script/Book.js';
import p from "../assets/aventura.jpeg";
import g from "../assets/ficção.jpeg";
import e from "../assets/g.jpg"
import l from "../assets/l.jpg"
import y from "../assets/p.jpg"
import u from "../assets/images.jpeg"



const categories = [
  { name: 'Romance', image: u },
  { name: 'Ficção Científica', image: g },
  { name: 'Fantasia', image: p },
  { name: 'Biografia', image: e },
  { name: 'História', image: l },
  { name: 'Mistério', image: y},
];

const Home = () => {
  const [books, setBooks] = useState([]);
  const [top10Books, setTop10Books] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchBooks()
        .then(response => setBooks(response))
        .catch(error => setError('Erro ao buscar livros: ' + error.message));

    fetchTop10Books()
        .then(response => setTop10Books(response))
        .catch(error => setError('Erro ao buscar top 10 livros: ' + error.message));
  }, []);


  const sliderSettings = {
    dots: true,
    infinite: false,
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
    slidesToShow: 4,
    slidesToScroll: 1,
    setError: "Books not found",
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
        <Box height="30vh" background="white" borderRadius="md">
          <Center height="100%">
            <Flex alignItems="center" justifyContent="center" direction="column">
              <Text padding={22} as="h1" fontSize="2xl" mt={4} textAlign="center">
                Explore nossa Biblioteca
              </Text>
              <Button  borderRadius="md" color="white" background="blue.500">Recomendação do dia </Button>
            </Flex>
          </Center>
        </Box>
        <VStack spacing={4} align="stretch">
          {error && <Box color="red.500">{error}</Box>}
          <Heading size="lg" mt={4} mb={4}>
            <Text fontFamily="Montserrat" fontSize="x-large">
             Novo
            </Text>
          </Heading>
          <Box className="slider-container" bg="white" borderRadius={10} shadow="lg">
            <Slider {...sliderSettings}>
              {books.map((book) => (
                  <Box key={book.id} className="slide-item" alignItems="center" justifyContent="space-around" mt={4} padding={10}>
                    <BookCard book={book} />
                  </Box>
              ))}
            </Slider>
          </Box>
          <Heading size="lg" mt={4} mb={4}>
            <Text fontFamily="Montserrat"  fontSize="x-large">
              Top 10 Livros
            </Text>
          </Heading>
          <Box className="slider-container" bg="white" borderRadius={10} shadow="lg">
            <Slider {...top10SliderSettings}>
              {top10Books.map((book) => (
                  <Box key={book.id} className="slide-item" alignItems="center" justifyContent="space-around" mt={4} padding={10}>
                    <BookCard book={book} />
                  </Box>
              ))}
            </Slider>
          </Box>
          <Heading size="lg" mt={4} mb={4} >
            <Text fontFamily="Montserrat" fontSize="x-large">
              Categorias
            </Text>

          </Heading >
          <Box className="slider-container" alignItems="center" bg="white" borderRadius={10} shadow="lg" padding={10}>
            <Slider {...sliderSettings}>
              {categories.map((category) => (
                  <CategoryCard key={category.name} category={category.name} image={category.image} />
              ))}
            </Slider>
          </Box>
        </VStack>
      </Box>
  );
};

export default Home;
