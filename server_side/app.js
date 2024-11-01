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
    origin: `${baseURL}`, // Client side URL
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
 
 app.post("/webhook",(req,res)=>{ 
 
     let body_param=req.body;
 
     console.log(JSON.stringify(body_param,null,2));
 
     if(body_param.object){
         console.log("inside body param");
         if(body_param.entry && 
             body_param.entry[0].changes && 
             body_param.entry[0].changes[0].value.messages && 
             body_param.entry[0].changes[0].value.messages[0]  
             ){
                let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from; 
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
 
                console.log("phone number "+phon_no_id);
                console.log("from "+from);
                console.log("boady param "+msg_body);
 
                axios({
                    method:"POST",
                    url:"https://graph.facebook.com/v13.0/"+phon_no_id+"/messages?access_token="+token,
                    data:{
                        messaging_product:"whatsapp",
                        to:from,
                        text:{
                            body:"Hi.. I'm Prasath, your message is "+msg_body
                        }
                    },
                    headers:{
                        "Content-Type":"application/json"
                    }
 
                });
 
                res.sendStatus(200);
             }else{
                 res.sendStatus(404);
             }
 
     }
 
 });