// api.js

const API_BASE_URL = 'https://parmeaman-ayhuc9fwhaecdeez.southeastasia-01.azurewebsites.net/api/v1';

async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        ...options,
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login page
            throw new Error('Unauthorized - Please login again');
        }
        throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
}

export const loginUser = async (email, password) => {
    const response = await fetchAPI('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    localStorage.setItem('token', response.access_token);
    return response;
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetchAPI('/orders/', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        return response;
    } catch (error) {
        console.error('Failed to create order:', error);
        throw error;
    }
};
export const registerUser = (userData) => {
    return fetchAPI('/users/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

export const fetchGames = () => {
    return fetchAPI('/games/');
};

export const fetchGameDetails = (gameId) => {
    return fetchAPI(`/games/${gameId}`);
};

export const fetchGameRecommendations = async (gameId) => {
    try {
        const response = await fetchAPI(`/games/recommendations/${gameId}`);
        return response;
    } catch (error) {
        console.error('Failed to fetch game recommendations:', error);
        throw error;
    }
};


export const fetchFoodRecommendation = async (userData) => {
    try {
        const response = await fetchAPI('/recommendation/', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return response;
    } catch (error) {
        console.error('Failed to fetch food recommendation:', error);
        throw error;
    }
};