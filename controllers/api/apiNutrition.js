const https = require('https');
const db = require('../../db/database');

const fetchRecipeData = async (searchQuery) => {
    try {
        const apiKey = '1f953591139340d98ce2a3a64ef6818b';
        const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&diet=${searchQuery}&timeFrame=week`;

        const response = await new Promise((resolve, reject) => {
            const req = https.get(apiUrl, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });

        return response.week;
    } catch (error) {
        console.error('Error fetching recipe data:', error);
        throw new Error('Failed to fetch recipe data!');
    }
};

module.exports = { fetchRecipeData };