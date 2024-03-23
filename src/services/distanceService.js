const get = require('axios');

// Function to calculate distance using the Distance Calculation API
const calculateDistance = async (latitude1, longitude1, latitude2, longitude2) => {
    try {
        const response = await get(`https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${latitude1}&longitude1=${longitude1}&latitude2=${latitude2}&longitude2=${longitude2}`);
        return response.data.distance;
    } catch (error) {
        console.error('Error calculating distance:', error);
        return -1;
    }
};

module.exports = { calculateDistance };