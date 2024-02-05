const express = require('express');
const app = express();





// Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
    const currentUTC = new Date().toUTCString();
    const currentDay = new Date(currentUTC).getUTCDay();      
    const currentHour = new Date(currentUTC).getUTCHours();
    console.log(currentDay);

    // Check if it's a weekday and within working hours (9 AM to 5 PM UTC)
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next();
    } else {
        res.status(403).send('Web application is only available during working hours (Monday to Friday, 9 AM to 5 PM UTC).');
    }
};

// Apply middleware for all routes
app.use(checkWorkingHours);

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.get('/services', (req, res) => {
//     res.render('services');
// });

// app.get('/contact', (req, res) => {
//     res.render('contact');
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});