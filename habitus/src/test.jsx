import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "@chakra-ui/react";

function Test2() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/books/findAll')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.error('Erro ao buscar os dados:', error));
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options); // Alterei para 'pt-BR' para o formato de data brasileiro
    };

    return (
        <div>
            {books.map((book) => (
                <div key={book.id}>
                    <p>Título: {book.title}</p>
                    <p>Autor: {book.author}</p>
                    <p>ISBN: {book.isbn}</p>
                    <p>Categoria do Livro: {book.category}</p>
                    <p>Data de Publicação: {formatDate(book.publishedDate)}</p>
                    {book.coverImageUrl && (
                        <img src={book.coverImageUrl} alt="Capa" />
                    )}
                    {book.pdfFilePath && (
                        <Link href={book.pdfFilePath} target="_blank" rel="noopener noreferrer">
                            Baixar PDF
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Test2;
