const BASE_URL = 'http://localhost:8080/api/client';

export const loginUser = async (credentials) => {
    console.log('Sending credentials to backend:', credentials);
    const response = await fetch(`${BASE_URL}`, {
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
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
    return await response.json();
};

export const updateUser = async (id, userDTO) => {
    const response = await fetch(`${BASE_URL}/${id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDTO),
    });

    if (!response.ok) {
        throw new Error('Update failed');
    }

    return await response.json();
};
