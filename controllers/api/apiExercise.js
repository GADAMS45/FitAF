const https = require('https');

const fetchExerciseData = async (searchQuery) => {
    try {
        const apiKey = '/TqCcXTOt+KoapPggwmfDw==IfJvBAFOhFEmirSV';
        const apiUrl = `https://api.apininja.xyz/exercises?category=${category}`;

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

        const parsedData = JSON.parse(response);

        return parsedData;
    } catch (error) {
        console.error('Error fetching exercise data:', error);
        throw new Error('Failed to fetch exercise data!');
    }
};

module.exports = { fetchExerciseData };