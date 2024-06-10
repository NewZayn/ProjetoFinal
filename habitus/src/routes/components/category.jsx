import React from 'react';
import { Box, Center, Image, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CategoryCard = ({ category, image }) => {
    return (
        <Center maxW="260px" borderWidth="1px" borderRadius="md" overflow="hidden" bg="white" m={2}>
            <LinkBox as="article">
                <Image src={image} alt={category} boxSize="260px" objectFit="cover" />
                <Box p="5">
                    <LinkOverlay as={RouterLink} to={`/category/${category}`}>
                        <Heading size="md" mt={2}>{category}</Heading>
                    </LinkOverlay>
                </Box>
            </LinkBox>
        </Center>
    );
};
export default CategoryCard;
