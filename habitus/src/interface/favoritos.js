// api.js
const BASE_URL = 'http://localhost:8080/api';

export const fetchBooks = async () => {
    const response = await fetch(`${BASE_URL}/books/findAll`);
    return await response.json();
};

export const fetchBookById = async (id) => {
    const response = await fetch(`${BASE_URL}/books/book/${id}`);
    return await response.json();
};

export const fetchBooksByUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/books/${userId}/findAll`);
    return await response.json();
};

export const fetchBooksByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/books/findByCategory/${category}`);
    return await response.json();
};

export const addBook = async (userId, book) => {
    const response = await fetch(`${BASE_URL}/books/${userId}/addBook`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    return await response.json();
};

export const loginUser = async (credentials) => {
    console.log('Sending credentials to backend:', credentials);
    const response = await fetch(`${BASE_URL}/client`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        console.error('Login failed with status:', response.status);
        throw new Error('Login failed');
    }

    return await response.json();
};

export const register = async (credentials) => {
    const response = await fetch(`${BASE_URL}/client/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return await response.json();
};

// Função para buscar os livros favoritos
export const fetchFavoriteBooks = async (userId) => {
    const response = await fetch(`${BASE_URL}/favorites/${userId}`);
    return await response.json();
};

// Função para buscar as informações do usuário
export const fetchUserProfile = async () => {
    const response = await fetch(`${BASE_URL}/client/profile`);
    return await response.json();
};
