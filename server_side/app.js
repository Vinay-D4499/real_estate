//------------This is the entry point of the application----------------//
/* To start the app, go to the terminal and run "npm install"  
and then run "npm start" */

const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./models'); // Import the database initializer
const errorHandler = require('./middlewares/errorMiddleware');
const axios = require('axios');
const cron = require("node-cron");

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const whatsAppWebhookRoutes = require('./routes/whatsAppWebhookRoutes')
const { baseURL } = require('./config/baseURL');
// const WebhookMessage = require('./models/webhookMessageModel');
// const WebhookMessageStatus = require('./models/webhookMessageStatusModel');
const propertyDetailsRoutes = require('./routes/propertyDetailsRoutes');

const reviewRoutes = require('./routes/reviewRoutes');
const propertMediaRoutes = require('./routes/propertyMediaRoutes');
const userPropertyRoutes = require('./routes/userPropertyDetailsRoutes');
const groupRoutes = require('./routes/groupRoutes');

const { Op } = require('sequelize');

const app = express();
const PORT = process.env.PORT;

// Middleware setup
app.use(cors({
    origin: `https://estate.laragrooming.com`, // Client side URL
    // origin: `http://localhost:5173`, // Client side URL  
}));
app.use(express.json()); // Middleware to parse JSON request body

// Route setup
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/whatsAppWebhook', whatsAppWebhookRoutes);
app.use('/api/review',reviewRoutes);
app.use('/api/propertyDetails',propertyDetailsRoutes);
app.use('/api/propertyMedia',propertMediaRoutes);
app.use('/api/userproperty',userPropertyRoutes);
app.use('/api/groups', groupRoutes);
app.use(errorHandler); // Error handler should be placed after all routes

// Method to create ADMIN automatically when the server starts
const createAdminUserOnStart = async () => {
    try {
        console.log("INSIDE createAdminUserOnStart ===>>");
        const response = await axios.post(`http://localhost:${PORT}/api/user/createUserByRequest`); 
        // const response = await axios.post(`https://api.estate.laragrooming.com/api/user/createUserByRequest`); 
        console.log(response.data.message);
    } catch (error) {
        console.log("Create user ====",error)
        console.error('Error creating admin user:', error.response ? error.response.data : error.message);
    }
};

/*
The task will run every 30 minutes of every hour, every day, every month, and every day of the week.
The other asterisks (*) represent "every" for each unit of time (hour, day, month, and day of the week).
*/
cron.schedule("*/30 * * * *", async () => {
    try {
        console.log("Executing automated message sending task...");
        const response = await axios.post(`http://localhost:${PORT}/api/user/sendAutomatedWhatsAppMessages`);
        const templateResponse = await axios.post(`http://localhost:${PORT}/api/user/sendAutomatedWhatsAppMessagesTemplate`);
        console.log("Task result:", response.data);
        console.log("Task result:", templateResponse.data);
    } catch (error) {
        console.error("Error executing automated message sending task:", error.message);
    }
});


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
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// const token=process.env.WHATSAPP_TOKEN;
// const mytoken=process.env.CHECK_TOKEN;

// app.get("/webhook",(req,res)=>{
//     let mode=req.query["hub.mode"];
//     let challange=req.query["hub.challenge"];
//     let token=req.query["hub.verify_token"];
 
 
//      if(mode && token){
 
//          if(mode==="subscribe" && token===mytoken){
//              res.status(200).send(challange);
//          }else{
//              res.status(403);
//          }
 
//      }
 
//  });
 
//  app.post('/webhook', (req, res) => {
//     const body_param = req.body;
//     console.log("Received webhook payload at:", new Date().toISOString());
//     console.log("Received webhook payload:", JSON.stringify(body_param, null, 2));

//     if (body_param.object === 'whatsapp_business_account') {
//         const entries = body_param.entry;

//         entries.forEach(entry => {
//             const changes = entry.changes;

//             if (changes && changes.length > 0) {
//                 changes.forEach(change => {
//                     const value = change.value;

//                     if (value.messages && value.messages.length > 0) {
//                         value.messages.forEach(message => {
//                             const phone_no_id = value.metadata.phone_number_id;
//                             const from = message.from;
//                             const msg_body = message.text.body;

//                             console.log("New message received:");
//                             console.log("Phone Number ID:", phone_no_id);
//                             console.log("From:", from);
//                             console.log("Message Body:", msg_body);

//                             // Here you can add your custom logic for the received message
//                             // For example, sending a reply
//                         });
//                     }

//                     if (value.statuses && value.statuses.length > 0) {
//                         value.statuses.forEach(status => {
//                             console.log("Message status update:");
//                             console.log("Status ID:", status.id);
//                             console.log("Status:", status.status);
//                             console.log("Recipient ID:", status.recipient_id);
//                         });
//                     }
//                 });
//             }
//         });

//         return res.sendStatus(200);
//     }

//     console.log("Invalid webhook event received.");
//     return res.sendStatus(404); 
// });



// app.post('/webhook', async (req, res) => {
//     const bodyParam = req.body;
//     console.log("Received webhook payload at:", new Date().toISOString());
//     console.log("Received webhook payload:", JSON.stringify(bodyParam, null, 2));

//     if (bodyParam.object === 'whatsapp_business_account') {
//         const entries = bodyParam.entry;

//         for (const entry of entries) {
//             const changes = entry.changes;

//             if (changes && changes.length > 0) {
//                 for (const change of changes) {
//                     const value = change.value;

//                     // Handling incoming messages
//                     if (value.messages && value.messages.length > 0) {
//                         for (const message of value.messages) {
//                             const phoneNumberId = value.metadata.phone_number_id;
//                             const from = message.from;
//                             const messageId = message.id;
//                             const timestamp = new Date(message.timestamp * 1000); 

//                             const messageData = {
//                                 whatsappUserId: from,
//                                 whatsappUserName: message.profile ? message.profile.name : null,
//                                 phoneNumberId: phoneNumberId,
//                                 messageId: messageId,
//                                 messageBody: message.text ? message.text.body : null,
//                                 timestamp: timestamp,
//                                 reactionEmoji: message.reaction ? message.reaction.emoji : null,
//                                 mediaId: message.media ? message.media.id : null,
//                                 mediaType: message.media ? message.media.type : null,
//                                 caption: message.caption || null,
//                                 mimeType: message.media ? message.media.mime_type : null,
//                                 locationLatitude: message.location ? message.location.latitude : null,
//                                 locationLongitude: message.location ? message.location.longitude : null,
//                                 locationName: message.location ? message.location.name : null,
//                                 locationAddress: message.location ? message.location.address : null,
//                                 buttonText: message.button ? message.button.text : null,
//                                 buttonPayload: message.button ? message.button.payload : null,
//                                 errorCode: message.errors ? message.errors[0].code : null,
//                                 errorDetails: message.errors ? message.errors[0].details : null,
//                             };

//                             try {
//                                 await WebhookMessage.create(messageData);
//                                 console.log("Message saved to WebhookMessage table");
//                             } catch (error) {
//                                 console.error("Error saving message to WebhookMessage table:", error);
//                             }
//                         }
//                     }

//                     // Handling message status updates
//                     if (value.statuses && value.statuses.length > 0) {
//                         for (const status of value.statuses) {
//                             const statusTimestamp = new Date(status.timestamp * 1000); 

//                             const statusData = {
//                                 status: status.status,
//                                 timestamp: statusTimestamp,
//                                 recipientId: status.recipient_id,
//                                 conversationId: status.conversation ? status.conversation.id : null,
//                                 conversationCategory: status.conversation ? status.conversation.origin.type : null,
//                                 isBillable: status.pricing ? status.pricing.billable : false,
//                                 errorCode: status.errors ? status.errors[0].code : null,
//                                 errorTitle: status.errors ? status.errors[0].title : null,
//                                 errorMessage: status.errors ? status.errors[0].message : null,
//                                 errorDetails: status.errors ? status.errors[0].error_data.details : null,
//                             };

//                             try {
//                                 const timeMargin = 5000;

//                                 const message = await WebhookMessage.findOne({
//                                     where: {
//                                         whatsappUserId: status.recipient_id,
//                                         timestamp: {
//                                             [Op.between]: [
//                                                 new Date(statusTimestamp - timeMargin),
//                                                 new Date(statusTimestamp + timeMargin)
//                                             ]
//                                         }
//                                     }
//                                 });

//                                 if (message) {
//                                     statusData.messageId = message.messageId; 
//                                     await WebhookMessageStatus.create(statusData);
//                                     console.log("Status saved to WebhookMessageStatus table");
//                                 } else {
//                                     console.error("No matching message found for status update.");
//                                 }
//                             } catch (error) {
//                                 console.error("Error saving status to WebhookMessageStatus table:", error);
//                             }
//                         }
//                     }
//                 }
//             }
//         }

//         return res.sendStatus(200);
//     }

//     console.log("Invalid webhook event received.");
//     return res.sendStatus(404);
// });

