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
    const bodyParam = req.body;

    // Check for incoming messages
    if (bodyParam.object === 'whatsapp_business_account') {
        const changes = bodyParam.entry[0].changes;
        if (changes && changes[0].value.messages && changes[0].value.messages[0]) {
            const messageData = changes[0].value;
            const from = messageData.messages[0].from; // Sender's WhatsApp number
            const msgBody = messageData.messages[0].text.body; // Text content of the message

            // Log the message details
            console.log("New message received:");
            console.log("From:", from);
            console.log("Message Body:", msgBody);

            // Example: Store the response in a database or further process it
            // db.saveMessage({ from, body: msgBody });

            // Respond to WhatsApp to acknowledge message receipt
            res.sendStatus(200);
        } else {
            res.sendStatus(404); // No message found in the payload
        }
    } else {
        res.sendStatus(404); // Invalid webhook event
    }
});



async function sendTextMessage(to, phone, email, password) {
    try {
        const response = await axios({
            url: `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json"
            },
            data: {
                messaging_product: "whatsapp",
                to: `91${to}`,
                type: "text",
                text: {
                    body: `Welcome! Here are your login credentials:\nPhone: ${phone}\nPassword: ${password}\n\nPlease use these to log in and update your password. Login here: ${baseURL}/signin`
                }
            }
        });
        console.log("Message sent successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error.response ? error.response.data : error.message);
        return { error: "Failed to send message" };
    }
}
