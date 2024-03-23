const axios = require('axios');

// Function to retrieve weather conditions from the Weather API
const getWeather = async (city, date) => {
    try {
        //const encodedCity = encodeURIComponent(city);
        date = date.toISOString().split('T')[0]
        const response = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${city}&date=${date}`);
        return response.data.weather;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return 'Unknown';
    }
};

module.exports = { getWeather };
