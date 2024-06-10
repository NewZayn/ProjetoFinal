const BASE_URL = 'http://localhost:8080/api/favorites';


export const fetchFavorites = async (userId) => {
    const response = await fetch(`${BASE_URL}/${userId}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar livros favoritos');
    }
    const favorites = await response.json();
    return favorites.map(favorite => ({
        id: favorite.bookId,
        title: favorite.title,
        author: favorite.author,
        image: favorite.coverUrl
    }));
};

export const addFavorite = async (userId, favoriteDTO) => {
    const response = await fetch(`http://localhost:8080/api/favorites/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteDTO),
    });

    if (!response.ok) {
        throw new Error('Erro ao adicionar livro à estante');
    }

    return await response.json();
};










