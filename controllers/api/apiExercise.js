const https = require('https');
const db = require('./api/database');

const fetchExerciseData = async (exerciseType) => {
    try {
        const apiKey = '/TqCcXTOt+KoapPggwmfDw==IfJvBAFOhFEmirSV';
        const apiUrl = `https://api.api-ninjas.com/v1/exercises?type=${exerciseType}`;

        const response = await new Promise((resolve, reject) => {
            const req = https.get(apiUrl, {
                headers: {'X-Api-Key': apiKey}
            }, (res) => {
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

        return response;
    } catch (error) {
        console.error('Error fetching exercise data:', error);
        throw new Error('Failed to fetch exercise data!');
    }
};

const selectWeeklyExercises = (exercises) => {
    const daysInWeek = 7;
    const exercisesPerDay = 5;
    let weeklySchedule = {};

    for (let i = 1; i <= daysInWeek; i++) {
        weeklySchedule[`Day ${i}`] = [];
        let availableExercises = [...exercises];
        while (weeklySchedule[`Day ${i}`].length < exercisesPerDay) {
            const randomIndex = Math.floor(Math.random() * availableExercises.length);
            weeklySchedule[`Day ${i}`].push(availableExercises[randomIndex]);
            availableExercises.splice(randomIndex, 1);
        }
    }

    return weeklySchedule;
};