import React, { useState } from 'react';
import { Box, Input, Heading, VStack, Center, Image } from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const books = [
  { title: 'Book 1', id: 1 },
  { title: 'Book 2', id: 2 },
  { title: 'Book 3', id: 3 },
  { title: 'Book 4', id: 4 },
  { title: 'Book 5', id: 5 },
  { title: 'Book 6', id: 6 }
];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Center> 
          <Input
            placeholder="Procurar livros..."  // Tradução para português
            value={searchTerm}
            onChange={handleSearchChange}
            borderRadius="full"
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            width="50%" // Aumenta a largura do campo de pesquisa
            mb={4} // Adiciona margem inferior para separar do slider
          />
        </Center>

        <Image
          src="src/assets/g.jpg"
          alt="Imagem de destaque"
          boxSize="400px"
          width="100%"
          objectFit="cover"
          mb={4} 
          borderRadius="20px"
        />

        <Heading size="lg" mt={4} mb={4}>
          Novo 
        </Heading>

        <Slider {...settings}>
          {filteredBooks.map((book) => (
            <Box key={book.id} p={4} bg="gray.200" borderRadius="md" textAlign="center">
              <Heading size="md">{book.title}</Heading>
            </Box>
          ))}
        </Slider>
      </VStack>
    </Box>
  );
}

export default Home;




