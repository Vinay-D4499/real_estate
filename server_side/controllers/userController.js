const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const userService = require('../services/userService');
const propertyServices = require('../services/propertyService');
const { sequelize } = require('../models');
const { baseURL } = require('../config/baseURL');
const { default: axios } = require('axios');
const s3 = require('../config/digitalOceanConfig');
const { v4: uuidv4 } = require('uuid');
const WebhookMessage = require('../models/webhookMessageModel');
const Users = require('../models/userModel');
const { Op } = require('sequelize');

// const createUser = async (req, res, next) => {
//     // const errors = validationResult(req);
//     // if (!errors.isEmpty()) {
//     //     return next(new BadRequestError('Validation failed'));
//     // }

//     try {
//         const id = req.user;
//         const { name, email, phone } = req.body;
//         const password = 'User@12345';
//         const role = req.body.role || 'CUSTOMER';
//         const newUser = await userService.createUser(id,{ name, email, phone, password, role });

//         return res.status(201).json({ message: 'Customer added successfully', user: newUser });
//     } catch (error) {
//         console.log("error ", error)
//         next(error);
//     }
// };

// const createUser = async (req, res, next) => {
//     const transaction = await sequelize.transaction(); 
//     try {
//         const id = req.user;
//         const { name, email, phone, propertyTypeIds, budget_min, budget_max } = req.body;
//         console.log("====><=====",req.body)
//         const password = 'User@12345';
//         const role = req.body.role || 'CUSTOMER';

//         const newUser = await userService.createUser(id, { name, email, phone, password, role, budget_min, budget_max }, { transaction });

//         if (propertyTypeIds && Array.isArray(propertyTypeIds)) {
//             await propertyServices.assignPropertyTypesToUser(newUser.id, propertyTypeIds, { transaction });
//         }

//         await transaction.commit(); 

//         return res.status(201).json({ message: 'Customer added successfully', user: newUser });
//     } catch (error) {
//         await transaction.rollback(); 
//         console.log("error ", error);
//         next(error);
//     }
// };

const createUser = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const id = req.user;
        const { name, email, phone, propertyTypeIds, budget_min, budget_max,brief_description,location } = req.body;
        const password = 'User@12345';
        const role = req.body.role || 'CUSTOMER';

        // Create the user
        const newUser = await userService.createUser(id, { name, email, phone, password, role, budget_min, budget_max, brief_description,location }, { transaction });

        if (propertyTypeIds && Array.isArray(propertyTypeIds)) {
            await propertyServices.assignPropertyTypesToUser(newUser.id, propertyTypeIds, { transaction });
        }

        // Commit the transaction
        await transaction.commit();

        // Send WhatsApp message and get the recipient_id
        const messageResponse = await sendTextMessage(phone, phone, email, password, newUser.id);
        console.log("Message sent and user updated with whatsappUserId");

        return res.status(201).json({ message: 'Customer added successfully', user: newUser });
    } catch (error) {
        await transaction.rollback();
        console.error("Error creating user:", error);
        next(error);
    }
};

async function sendTextMessage(to, phone, email, password, userId) {
    try {
        const messageBody = `Welcome! Here are your login credentials:\nPhone: ${phone}\nPassword: ${password}\n\nPlease use these to log in and update your password. Login here: ${baseURL}/signin`;

        // Send the message via WhatsApp API
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
                text: { body: messageBody }
            }
        });

        // Check if the message was sent by the business account or a user
        const messageDirection = `91${to}` === response.data.messages[0].recipient_id ? 'outgoing' : 'incoming';

        // Store the outgoing message in WebhookMessage
        const messageData = {
            whatsappUserId: `91${to}`,
            whatsappUserName: null, // If user name is unknown at this point
            phoneNumberId: process.env.PHONE_NUMBER_ID,
            messageId: response.data.messages[0].id, // WhatsApp's message ID
            messageBody: messageBody,
            timestamp: new Date(),
            direction: messageDirection // Determine direction
        };

        await WebhookMessage.create(messageData);
        console.log("Message saved to WebhookMessage table with direction:", messageDirection);

        return response.data;

    } catch (error) {
        console.error("Error sending message:", error.response ? error.response.data : error.message);
        return { error: "Failed to send message" };
    }
}



const sendAutomatedWhatsAppMessages = async (req, res) => {
    try {
        const now = new Date();
        const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000);
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // const fiveMinutesAgo = new Date(now.getTime() - 1 * 60 * 1000);
        // const sixMinutesAgo = new Date(now.getTime() - 59 * 60 * 1000);


        const usersToNotify = await Users.findAll({
            where: {
                last_interaction_time: {
                    [Op.between]: [twentyFourHoursAgo, twentyThreeHoursAgo]
                    // [Op.between]: [sixMinutesAgo, fiveMinutesAgo]
                }
            }
        });

        if (usersToNotify.length === 0) {
            console.log("No users found with last interaction time in the specified range.");
            return res.status(200).json({ message: "No users found in the specified range." });
        }

        for (const user of usersToNotify) {
            const to = `91${user.phone}`;
            const messageBody = `Hello ${user.name || "there"},\n\nWe hope you're doing well! To get more information about the properties near you at affordable prices, please reply to this chat with *Yes* or *No*. Your response will help us better assist you.\n\nThank you, and we look forward to serving you!`;

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
                        to: to,
                        type: "text",
                        text: { body: messageBody }
                    }
                });

                const messageData = {
                    whatsappUserId: to,
                    whatsappUserName: user.name || null,
                    phoneNumberId: process.env.PHONE_NUMBER_ID,
                    messageId: response.data.messages[0].id,
                    messageBody: messageBody,
                    timestamp: new Date(),
                    direction: "outgoing"
                };

                await WebhookMessage.create(messageData);
                console.log(`Message sent to ${user.phone} and saved to WebhookMessage table.`);
            } catch (error) {
                console.error(`Error sending message to ${user.phone}:`, error.response ? error.response.data : error.message);
            }
        }

        return res.status(200).json({ message: "Automated messages sent successfully." });
    } catch (error) {
        console.error("Error in sendAutomatedWhatsAppMessages:", error.message);
        return res.status(500).json({ error: "Failed to send automated messages." });
    }
};


// async function sendTextMessage(to, phone, email, password) {
//     try {
//         const response = await axios({
//             url: 'https://graph.facebook.com/v20.0/487309167791872/messages',
//             method: 'post',
//             headers: {
//                 'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 'Content-Type': 'application/json'
//             },
//             data: {
//                 messaging_product: 'whatsapp',
//                 to: `91${to}`,
//                 type: 'text',
//                 text: {
//                     body: `Welcome! Here are your login credentials:\nPhone: ${phone}\nPassword: ${password}\n\nPlease use these to log in and update your password. Login here: ${baseURL}/signin`
//                     // body:'hello'
//                 }
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error sending text message:', error.response ? error.response.data : error.message);
//         return { error: 'Failed to send message' };
//     }
// }

// async function sendTextMessage(to, phone, email, password) {
//     try {
//         const messageBody = `Welcome! Here are your login credentials:\nPhone: ${phone}\nPassword: ${password}\n\nPlease use these to log in and update your password. Login here: ${baseURL}/signin`;

//         // Send the message via WhatsApp API
//         const response = await axios({
//             url: `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 "Content-Type": "application/json"
//             },
//             data: {
//                 messaging_product: "whatsapp",
//                 to: `91${to}`,
//                 type: "text",
//                 text: { body: messageBody }
//             }
//         });

//         // Store the outgoing message in WebhookMessage with '91' prefix added to whatsappUserId
//         const messageData = {
//             whatsappUserId: `91${to}`, // Prefix '91' to the phone number
//             whatsappUserName: null, // If user name is unknown at this point
//             phoneNumberId: process.env.PHONE_NUMBER_ID,
//             messageId: response.data.messages[0].id, // WhatsApp's message ID
//             messageBody: messageBody,
//             timestamp: new Date(),
//             direction: 'outgoing'
//         };

//         await WebhookMessage.create(messageData);
//         console.log("Outgoing message saved to WebhookMessage table");

//         return response.data;

//     } catch (error) {
//         console.error("Error sending message:", error.response ? error.response.data : error.message);
//         return { error: "Failed to send message" };
//     }
// }


// const createUserByRquest = async (req, res, next) => {
//     try {
//         const result = await userService.createUserByRquest({
//             name: "Admin",
//             email: "admin@admin.com",
//             phone: "9876543210",
//             password: "Admin@1234",
//             role: "ADMIN"
//         });

//         // Check if the user already exists
//         if (result.user) {
//             return res.status(200).json({ message: result.message, user: result.user });
//         }

//         // If user was created
//         return res.status(201).json({ message: 'User created successfully', user: result.user });
//     } catch (error) {
//         next(error);
//     }
// };

const sendAutomatedWhatsAppMessagesTemplate = async (req, res) => {
    try {
        const now = new Date();
        const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000);
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        // // Testing range: 5 to 20 minutes ago
        // const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
        // const sixMinutesAgo = new Date(now.getTime() - 40 * 60 * 1000);

        // Fetch users whose last interaction time is within the specified range
        const usersToNotify = await Users.findAll({
            where: {
                last_interaction_time: {
                    [Op.between]: [twentyFourHoursAgo, twentyThreeHoursAgo]
                    // [Op.between]: [sixMinutesAgo, fiveMinutesAgo] // Adjusted for testing purposes
                }
            }
        });

        if (usersToNotify.length === 0) {
            console.log("No users found with last interaction time in the specified range.");
            return res.status(200).json({ message: "No users found in the specified range." });
        }

        for (const user of usersToNotify) {
            const to = `91${user.phone}`; // Add country code prefix to the phone number

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
                        to: to, // Target user phone number
                        type: "template", // Using template message
                        template: {
                            name: 'hello_world',
                            language: {
                                code: 'en_US'
                            }
                        }
                    }
                });

                // Save message details to the WebhookMessage table
                const messageData = {
                    whatsappUserId: to,
                    whatsappUserName: user.name || null, 
                    phoneNumberId: process.env.PHONE_NUMBER_ID,
                    messageId: response.data.messages[0].id, // WhatsApp message ID
                    messageBody: "Template Message Sent", // Log that a template message was used
                    timestamp: new Date(),
                    direction: "outgoing" // Mark the message as outgoing
                };

                await WebhookMessage.create(messageData);
                console.log(`Template message sent to ${user.phone} and saved to WebhookMessage table.`);
            } catch (error) {
                console.error(`Error sending template message to ${user.phone}:`, error.response ? error.response.data : error.message);
            }
        }

        return res.status(200).json({ message: "Template messages sent successfully." });
    } catch (error) {
        console.error("Error in sendAutomatedWhatsAppMessages:", error.message);
        return res.status(500).json({ error: "Failed to send template messages." });
    }
};


const createUserByRequest = async (req, res, next) => {
    try {
        const result = await userService.createAdminByRequest({
            name: "Admin",
            email: "admin@admin.com",
            phone: "9876543210",
            password: "Admin@1234",
        });

        // Check if the admin already exists
        if (result.admin) {
            return res.status(200).json({ message: result.message, admin: result.admin });
        }

        // If admin was created
        return res.status(201).json({ message: 'Admin created successfully', admin: result.admin });
    } catch (error) {
        next(error);
    }
};


const findUserById = async (req, res, next) => {
    // const { id } = req.params;
    const id = req.user;
    try {
        const user = await userService.findUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
const findUserByPhoneNumber = async (req, res, next) => {
    // const { id } = req.params;
    const { phone } = req.body;
    console.log("received phone number ::::>>>>>", phone)
    try {
        const user = await userService.findUserByPhoneNumber(phone);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const getAdminDetails = async (req, res, next) => {
    // const { id } = req.params;
    const id = req.user;
    try {
        const user = await userService.getAdminDetails(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    // const id = req.user;
    console.log(id);
    try {
        const user = await userService.findUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const getAllCustomerDetails = async (req, res, next) => {
    const id = req.user;
    try {
        const customers = await userService.getAllCustomerDetails(id);
        return res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
}

const getInactiveCustomerDetails = async (req, res, next) => {
    const id = req.user;
    try {
        const customers = await userService.getInactiveCustomerDetails(id);
        return res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
}

const updateUserById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Validation failed'));
    }

    const userIdToUpdate = req.params.id;
    const requesterId = req.user;

    const {
        name,
        role,
        phone,
        location,
        profile_picture_url,
        budget_min,
        budget_max,
        email,
        address,
        referred_by
    } = req.body;

    try {
        const updatedUser = await userService.updateUserById(requesterId, userIdToUpdate, {
            name,
            role,
            phone,
            location,
            profile_picture_url,
            budget_min,
            budget_max,
            email,
            address,
            referred_by
        });

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
}

// const updateProfilePicture = async (req, res, next) => {
//     const userId = req.user; 

//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }

//     try {
//         const user = await userService.findUserById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the user has an existing profile picture
//         const oldProfilePicture = user.profile_picture_url;
//         if (oldProfilePicture) {
//             const oldFilePath = path.join(__dirname, '..', 'uploads', 'profile_pictures', oldProfilePicture);

//             // deletes the old profile picture
//             if (fs.existsSync(oldFilePath)) {
//                 fs.unlinkSync(oldFilePath);
//             }
//         }

//         user.profile_picture_url = req.file.filename;
//         await user.save();

//         return res.status(200).json({ message: 'Profile picture updated successfully', user });

//     } catch (error) {
//         next(error);
//     }
// };

const updateProfilePicture = async (req, res, next) => {
    const { id } = req.params;
    // console.log("updated =============>>>>>>>", id)
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const user = await userService.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // to create specific folder structure based on client name
        const clientName = process.env.CLIENT_NAME || 'default_client';

        /* The image will be stored inside <CLIENT_NAME>/profile_pictures folder */
        const fileKey = `${clientName}/profile_pictures/${uuidv4()}_${req.file.originalname}`;

        const params = {
            Bucket: 'real_estate', // DigitalOcean space name 
            Key: fileKey,
            Body: req.file.buffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();

        // Delete old profile picture if it exists
        if (user.profile_picture_url) {
            const oldFileKey = path.basename(user.profile_picture_url);

            await s3.deleteObject({
                Bucket: 'real_estate', // DigitalOcean Space name
                Key: `${clientName}/profile_pictures/${oldFileKey}`,
            }).promise();
        }

        user.profile_picture_url = uploadResult.Location;
        console.log(user.profile_picture_url);
        await user.save();

        return res.status(200).json({ message: 'Profile picture updated successfully', user });
    } catch (error) {
        next(error);
    }
};

const updateAdminProfilePicture = async (req, res, next) => {
    const { id } = req.params;
    // console.log("updated =============>>>>>>>", id)
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const user = await userService.getAdminDetails(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // to create specific folder structure based on client name
        const clientName = process.env.CLIENT_NAME || 'default_client';

        /* The image will be stored inside <CLIENT_NAME>/profile_pictures folder */
        const fileKey = `${clientName}/profile_pictures/${uuidv4()}_${req.file.originalname}`;

        const params = {
            Bucket: 'real_estate', // DigitalOcean space name 
            Key: fileKey,
            Body: req.file.buffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();

        // Delete old profile picture if it exists
        if (user.profile_picture_url) {
            const oldFileKey = path.basename(user.profile_picture_url);

            await s3.deleteObject({
                Bucket: 'real_estate', // DigitalOcean Space name
                Key: `${clientName}/profile_pictures/${oldFileKey}`,
            }).promise();
        }

        user.profile_picture_url = uploadResult.Location;
        console.log(user.profile_picture_url);
        await user.save();

        return res.status(200).json({ message: 'Profile picture updated successfully', user });
    } catch (error) {
        next(error);
    }
};

// const getProfilePicture = async (req, res, next) => {
//     const { id } = req.body;

//     try {
//         const user = await userService.findUserById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const profilePicturePath = user.profile_picture_url
//             ? path.join(__dirname, '..', 'uploads', 'profile_pictures', user.profile_picture_url)
//             : path.join(__dirname, '..', 'uploads', 'profile_pictures', 'default.png');

//         if (fs.existsSync(profilePicturePath)) {
//             return res.sendFile(profilePicturePath);
//         } else {
//             return res.status(404).json({ message: 'Profile picture not found' });
//         }

//     } catch (error) {
//         next(error);
//     }
// };

const getProfilePicture = async (req, res, next) => {
    const { id } = req.body;

    try {
        const user = await userService.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has a profile picture URL in the database
        const profilePictureUrl = user.profile_picture_url || 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png';

        return res.status(200).json({ profilePictureUrl });

    } catch (error) {
        next(error);
    }
};

const getAdminProfilePicture = async (req, res, next) => {
    const { id } = req.body;
    console.log("profile pic id ", id)
    try {
        const user = await userService.getAdminDetails(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has a profile picture URL in the database
        const profilePictureUrl = user.profile_picture_url || 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png';

        return res.status(200).json({ profilePictureUrl });

    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Attempting to delete user with ID: ${id}`);

    try {
        const result = await userService.deactivateUserById(id);
        return res.status(200).json({ message: 'User deactivated successfully', result });
    } catch (error) {
        next(error);
    }
};

const activateUserById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Attempting to delete user with ID: ${id}`);

    try {
        const result = await userService.activateUserById(id);
        return res.status(200).json({ message: 'User deactivated successfully', result });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    findUserById,
    findUserByPhoneNumber,
    getAdminDetails,
    getUserById,
    updateUserById,
    // createUserByRquest,
    createUserByRequest,
    updateProfilePicture,
    updateAdminProfilePicture,
    getProfilePicture,
    getAdminProfilePicture,
    getAllCustomerDetails,
    getInactiveCustomerDetails,
    deleteUserById,
    activateUserById,
    sendAutomatedWhatsAppMessages,
    sendAutomatedWhatsAppMessagesTemplate,
};
