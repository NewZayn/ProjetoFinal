// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
} from '@chakra-ui/react';

export default function Sobre() {
    return (
        <Box b py={10}>
            <Container maxW={'6xl'}>
                <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                    <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                        Sobre Nós
                    </Heading>
                    <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'lg' }}>
                        Alexandria é uma biblioteca virtual dedicada a proporcionar acesso a uma vasta coleção de livros e recursos digitais. Nossa missão é promover a leitura e o conhecimento, oferecendo uma plataforma acessível e fácil de usar para todos.
                    </Text>
                    <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'lg' }}>
                        Fundada em 2024, a Alexandria tem como objetivo transformar a forma como as pessoas acessam e consomem literatura e informação. Estamos comprometidos em oferecer um catálogo diversificado, com obras de diferentes gêneros e autores, tanto clássicos quanto contemporâneos.
                    </Text>
                    <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'lg' }}>
                        Agradecemos por visitar nossa plataforma e esperamos que você encontre os livros e recursos que precisa para enriquecer seu conhecimento e aproveitar momentos de leitura prazerosa.
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
}




