import axios from 'axios';

const API_KEY = '0029fedabaf143a0ae09b004e81db16b'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTopRatedMovies(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: page
            }
        });
        
        return response.data.results; // Return the array of top-rated movies
    } catch (error) {
        console.error('Error fetching top-rated movies:', error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
}

export default fetchTopRatedMovies;