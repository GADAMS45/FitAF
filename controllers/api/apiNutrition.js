const https = require('https');

const fetchRecipeData = async (searchQuery) => {
    try {
        const apiKey = '1f953591139340d98ce2a3a64ef6818b';
        const apiUrl = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${searchQuery}&number=5`;

        const response = await new Promise((resolve, reject) => {
            const req = https.get(apiUrl, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });

        const data = JSON.parse(response);

        return data.results;
    } catch (error) {
        console.error('Error fetching recipe data:', error);
        throw new Error('Failed to fetch recipe data!');
    }
};

module.exports = { fetchRecipeData };