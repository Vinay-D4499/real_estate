//------------This is the entry point of the application----------------//
 /*to start the app go to terminal and run "npm install "  
 and then run " npm start " */

const express = require('express');
const { initDatabase } = require('./models'); // Import the database initializer to initialize the database 
const errorHandler = require('./middlewares/errorMiddleware');

const userRoutes = require('./routes/userRoutes');


const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON request body

//routes

//Users routes 
app.use('/api/user', userRoutes)



app.use(errorHandler); // this should be after all routes

// Initialize database
initDatabase().then(() => {
    // Start the server after database initialization is complete
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});

//for testing 
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
