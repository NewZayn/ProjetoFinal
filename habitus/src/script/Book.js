const BASE_URL = 'https://back-end-repository-2.onrender.com/api/books';

export const fetchBooks = async () => {
    const response = await fetch(`${BASE_URL}/findAllNewBooks`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};


export const fetchTop10Books = async () => {
    const response = await fetch(`${BASE_URL}/books/top10`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};
export const fetchBooksByTitle = async (title) => {
    const response = await fetch(`${BASE_URL}/${title}/findByTitle`);
    if (!response.ok) {
        throw new Error('');
    }
    return await response.json();
};

export const fetchBookByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/${category}/findByCategory`);
    if (!response.ok) {
        throw new Error('Category not found');
    }
    return await response.json();
};

export const fetchCreatedBooks = async (accountId) => {
    const response = await fetch(`${BASE_URL}/createdBy/${accountId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
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



export const fetchBookById = async (id) => {
    const response = await fetch(`${BASE_URL}/book/${id}`);
    if (!response.ok) {
        throw new Error('Book not found');
    }
    return await response.json();
};

