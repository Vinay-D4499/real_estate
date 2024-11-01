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
 
//  app.post('/webhook', (req, res) => {
//     const body_param = req.body;

//     console.log("Received webhook payload:", JSON.stringify(body_param, null, 2));

//     if (body_param.object === 'whatsapp_business_account') {
//         if (
//             body_param.entry &&
//             body_param.entry[0].changes &&
//             body_param.entry[0].changes[0].value.messages &&
//             body_param.entry[0].changes[0].value.messages[0]
//         ) {
//             const phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
//             const from = body_param.entry[0].changes[0].value.messages[0].from;
//             const msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

//             console.log("New message received:");
//             console.log("Phone Number ID:", phone_no_id);
//             console.log("From:", from);
//             console.log("Message Body:", msg_body);

//             // Respond to the user with a custom message using the sendTextMessage function
//             axios({
//                 method: "POST",
//                 url: `https://graph.facebook.com/v13.0/${phone_no_id}/messages?access_token=${token}`,
//                 data: {
//                     messaging_product: "whatsapp",
//                     to: from,
//                     text: {
//                         body: `Hi.. I'm vinay, "`
//                     }
//                 },
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })
//             .then(response => console.log("Reply sent:", response.data))
//             .catch(error => console.error("Error sending message:", error.response ? error.response.data : error.message));

//             // Respond to WhatsApp to acknowledge the message receipt
//             res.sendStatus(200);
//         } else {
//             console.log("No valid message found in the webhook payload.");
//             res.sendStatus(404); // No message found in the payload
//         }
//     } else {
//         console.log("Invalid webhook event received.");
//         res.sendStatus(404); // Invalid webhook event
//     }
// });

app.post('/webhook', (req, res) => {
    const body_param = req.body;

    console.log("Received webhook payload:", JSON.stringify(body_param, null, 2));

    if (body_param.object === 'whatsapp_business_account') {
        if (
            body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]
        ) {
            const phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
            const from = body_param.entry[0].changes[0].value.messages[0].from;
            const msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

            console.log("New message received:");
            console.log("Phone Number ID:", phone_no_id);
            console.log("From:", from);
            console.log("Message Body:", msg_body);


            // console.log(response.data)

            // Respond to WhatsApp to acknowledge the message receipt
            res.sendStatus(200);
        } else {
            console.log("No valid message found in the webhook payload.");
            res.sendStatus(404); // No message found in the payload
        }
    } else {
        console.log("Invalid webhook event received.");
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
