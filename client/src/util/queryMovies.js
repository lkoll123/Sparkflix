import axios from 'axios';

// Replace 'YOUR_API_KEY' with your actual TMDb API key
const API_KEY = '0029fedabaf143a0ae09b004e81db16b';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchPopularMovies() {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: 1
            }
        });

        // Log the response data to see the movie details
        console.log(response.data.results);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

// Call the function to fetch popular movies

export default fetchPopularMovies;