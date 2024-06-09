import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Box, Heading, Input, Button, FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';
import { AuthContext } from '../authcontext.jsx';

function AddBook() {
    const { user } = useContext(AuthContext);
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user || !user.id) {
            console.error('User or user ID is not defined');
            return;
        }

        const formattedPublishedDate = new Date(publishedDate + 'T00:00:00Z').toISOString();
        const formData = new FormData();
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('publishedDate', formattedPublishedDate);
        formData.append('image', coverImage);
        formData.append('pdf', pdfFile);
        formData.append('userId', user.id);

        try {
            const response = await axios.post(`http://localhost:8080/api/books/${user.id}/addBook`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Livro adicionado com sucesso:', response.data);
            window.alert('Livro adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
        }
    };

    return (
        <Box p={4} shadow="md" rounded="lg" bg="white">
            <Heading mb={4}>Adicionar Livro</Heading>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormControl isRequired mb={3}>
                    <FormLabel htmlFor="author">Autor:</FormLabel>
                    <Input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <FormErrorMessage>Campo obrigatório</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mb={3}>
                    <FormLabel htmlFor="isbn">ISBN:</FormLabel>
                    <Input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                    <FormErrorMessage>Campo obrigatório</FormErrorMessage>
                </FormControl>
                <FormControl isRequired mb={3}>
                    <FormLabel htmlFor="title">Título:</FormLabel>
                    <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <FormErrorMessage>Campo obrigatório</FormErrorMessage>
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel htmlFor="category">Categoria:</FormLabel>
                    <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Selecione uma categoria</option>
                        <option value="Romance">Romance</option>
                        {/* Adicione mais categorias aqui */}
                    </Select>
                </FormControl>
                <FormControl isRequired mb={3}>
                    <FormLabel htmlFor="publishedDate">Data de Publicação:</FormLabel>
                    <Input type="date" id="publishedDate" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
                    <FormErrorMessage>Campo obrigatório</FormErrorMessage>
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel htmlFor="image">Imagem de Capa:</FormLabel>
                    <Input type="file" id="image" onChange={(e) => setCoverImage(e.target.files[0])} />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel htmlFor="pdf">Arquivo PDF:</FormLabel>
                    <Input type="file" id="pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
                </FormControl>
                <Button type="submit" colorScheme="teal">Adicionar Livro</Button>
            </form>
        </Box>
    );
}

export default AddBook;
