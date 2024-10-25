//------------This is the entry point of the application----------------//
 /*to start the app go to terminal and run "npm install "  
 and then run " npm start " */

const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./models'); // Import the database initializer to initialize the database 
const errorHandler = require('./middlewares/errorMiddleware');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', //client side url 
}));

const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON request body

//routes

//Users routes 
app.use('/api/user', userRoutes);

//auth routes 
app.use('/api/auth', authRoutes);



app.use(errorHandler);    // this should be placed after all routes in order to track the errors

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
