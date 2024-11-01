//------------This is the entry point of the application----------------//
/* To start the app, go to the terminal and run "npm install"  
and then run "npm start" */

const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./models'); // Import the database initializer
const errorHandler = require('./middlewares/errorMiddleware');
const axios = require('axios');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const { baseURL } = require('./config/baseURL');

const app = express();
const PORT = process.env.PORT;

// Middleware setup
app.use(cors({
    origin: `https://estate.laragrooming.com`, // Client side URL
}));
app.use(express.json()); // Middleware to parse JSON request body

// Route setup
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use(errorHandler); // Error handler should be placed after all routes

// Method to create ADMIN automatically when the server starts
const createAdminUserOnStart = async () => {
    try {
        // const response = await axios.post(`http://localhost:3000/api/user/createUserByRequest`); 
        const response = await axios.post(`https://api.estate.laragrooming.com/api/user/createUserByRequest`); 
        console.log(response.data.message);
    } catch (error) {
        console.log(error)
        console.error('Error creating admin user:', error.response ? error.response.data : error.message);
    }
};


// Initialize database and start the server
initDatabase().then(async () => {
    // Create admin user after database initialization
    

    // Start the server after database initialization is complete
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        await createAdminUserOnStart();
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});

// For testing 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const token=process.env.WHATSAPP_TOKEN;
const mytoken=process.env.CHECK_TOKEN;

app.get("/webhook",(req,res)=>{
    let mode=req.query["hub.mode"];
    let challange=req.query["hub.challenge"];
    let token=req.query["hub.verify_token"];
 
 
     if(mode && token){
 
         if(mode==="subscribe" && token===mytoken){
             res.status(200).send(challange);
         }else{
             res.status(403);
         }
 
     }
 
 });
 
 app.post('/webhook', (req, res) => {
    const body_param = req.body;
    console.log("Received webhook payload at:", new Date().toISOString());
    console.log("Received webhook payload:", JSON.stringify(body_param, null, 2));

    if (body_param.object === 'whatsapp_business_account') {
        const entries = body_param.entry;

        entries.forEach(entry => {
            const changes = entry.changes;

            if (changes && changes.length > 0) {
                changes.forEach(change => {
                    const value = change.value;

                    if (value.messages && value.messages.length > 0) {
                        value.messages.forEach(message => {
                            const phone_no_id = value.metadata.phone_number_id;
                            const from = message.from;
                            const msg_body = message.text.body;

                            console.log("New message received:");
                            console.log("Phone Number ID:", phone_no_id);
                            console.log("From:", from);
                            console.log("Message Body:", msg_body);

                            // Here you can add your custom logic for the received message
                            // For example, sending a reply
                        });
                    }

                    if (value.statuses && value.statuses.length > 0) {
                        value.statuses.forEach(status => {
                            console.log("Message status update:");
                            console.log("Status ID:", status.id);
                            console.log("Status:", status.status);
                            console.log("Recipient ID:", status.recipient_id);
                        });
                    }
                });
            }
        });

        return res.sendStatus(200);
    }

    console.log("Invalid webhook event received.");
    return res.sendStatus(404); 
});