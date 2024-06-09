const BASE_URL = 'http://localhost:8080/api/books';

export const fetchBooks = async () => {
    const response = await fetch(`${BASE_URL}/findAll`);
    return await response.json();
};

export const fetchBookPdf = async (bookId) => {
    const response = await fetch(`${BASE_URL}/book/${bookId}/pdf`);
    if (!response.ok) {
        throw new Error('Failed to fetch PDF');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url;
};

export const fetchBookImage = async (bookId) => {
    const response = await fetch(`${BASE_URL}/book/${bookId}/image`);
    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url;
};


export const fetchBookById = async (id) => {
    const response = await fetch(`${BASE_URL}/book/${id}`);
    if (!response.ok) {
        throw new Error('Book not found');
    }
    return await response.json();
};


export const fetchBooksByUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/${userId}/findAll`);
    return await response.json();
};


export const fetchBooksByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/findByCategory/${category}`);
    return await response.json();
};



export const addBook = async (userId, book) => {
    const response = await fetch(`${BASE_URL}/${userId}/addBook`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    return await response.json();
};
