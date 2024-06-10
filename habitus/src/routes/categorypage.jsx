// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, VStack } from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from './components/book.jsx';
import { fetchBookByCategory } from '../script/Book.js';

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
            <VStack spacing={4} align="stretch">
                {error && <Box color="red.500">{error}</Box>}
                <Box className="slider-container">
                    <Slider {...sliderSettings}>
                        {books.map((book) => (
                            <Box key={book.id} className="slide-item" alignItems="center" justifyContent="space-around" mt={4}>
                                <BookCard book={book} />
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </VStack>
        </Box>
    );
};

export default CategoryPage;
