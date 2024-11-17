const s3 = require('../config/digitalOceanConfig');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { sequelize } = require('../models');
const propertMediaService = require('../services/propertyMediaService');
const { NotFoundError,BadRequestError } = require('../errors/httpErrors');
const PropertyMedia = require('../models/propertyMedia')
const PropertyDetails = require('../models/propertyDetailsModel')


const propertMedia_img = async (req, res, next) => {
    const { property_id } = req.params;
    console.log("updated =============>>>>>>>", property_id);

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    
    try {
        // Perform the file upload and generate URL
        const clientName = process.env.CLIENT_NAME || 'default_client';
        const fileKey = `${clientName}/propert_Media/${uuidv4()}_${req.file.originalname.replace(/\s+/g, '')}`;

        const params = {
            Bucket: 'real_estate',
            Key: fileKey,
            Body: req.file.buffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();

        // Use the uploaded file URL as `propertymedia_img`
        const propertymedia_img = uploadResult.Location;

        // Call the service to save the entry
        const propertyMedia = await propertMediaService.propertymedia_img(property_id, propertymedia_img);
        if (!propertyMedia) {
            return res.status(404).json({ message: 'Property not found' });
        }

        console.log(propertyMedia.propertymedia_img);
        await propertyMedia.save();

        return res.status(200).json({ message: 'Media uploaded successfully', propertyMedia });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

const propertMedia_video = async (req, res, next) => {
    const  {property_id}  = req.params;
    const {propertymedia_video } = req.body;
   
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const propertyMedia = await propertMediaService.propertymedia_video(propertymedia_video,property_id);
        if (!propertyMedia) {
            return res.status(404).json({ message: 'User not found' });
        }
           const fileName = req.file.originalname.replace(/\s+/g,'');
        
        // to create specific folder structure based on client name
        const clientName = process.env.CLIENT_NAME || 'default_client';
        
        /* The image will be stored inside <CLIENT_NAME>/profile_pictures folder */
        const fileKey = `${clientName}/propert_Media/${uuidv4()}_${fileName}`;

        const params = {
            Bucket: 'real_estate', // DigitalOcean space name 
            Key: fileKey,
            Body: req.file.buffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();

        // Delete old profile picture if it exists
        if (propertyMedia.propertymedia_video) {
            const oldFileKey = path.basename(propertyMedia.propertymedia_video);

            await s3.deleteObject({
                Bucket: 'real_estate', // DigitalOcean Space name
                Key: `${clientName}/propert_Media/${oldFileKey}`,
            }).promise();
        }

        propertyMedia.propertymedia_video = uploadResult.Location;
        console.log(propertyMedia.propertymedia_video);
        await propertyMedia.save();

        return res.status(200).json({ message: 'Profile picture updated successfully', propertyMedia });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            next(error);  // Pass internal server errors to error-handling middleware
        }
        next(error);
    }
};

const updateMediaFile = async (req, res, next) => {
    const {  propertymedia_id,id } = req.body;
    const { file } = req;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // Validate that either an image or a video is provided, but not both
        const isImage = file.mimetype.startsWith('image/');
        const isVideo = file.mimetype.startsWith('video/');

    console.log(isImage ,"-----------------",isVideo)             
        if (isImage && isVideo) {
            return res.status(400).json({ message: 'Please upload either an image or a video, not both.' });
        }
        
        console.log("------propertymedia_id",propertymedia_id)
        // Check if PropertyMedia and PropertyDetails exist
        const propertyMedia = await PropertyMedia.findOne({
            where : {propertymedia_id : propertymedia_id }});
        if (!propertyMedia) {
            return res.status(404).json({ message: 'Media record not found' });
        }

        const propertyDetails = await PropertyDetails.findByPk(id);
        if (!propertyDetails) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Upload the file to S3
        const fileKey = `${process.env.CLIENT_NAME || 'default_client'}/property_Media/${uuidv4()}_${file.originalname.replace(/\s+/g, '')}`;
        const params = {
            Bucket: 'real_estate',
            Key: fileKey,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        const uploadResult = await s3.upload(params).promise();
        const fileUrl = uploadResult.Location;

        // Update the PropertyMedia record
        if (isImage) {
            propertyMedia.propertymedia_img = fileUrl;
            propertyMedia.propertymedia_video = null; // Ensure the video field is cleared
        } else if (isVideo) {
            propertyMedia.propertymedia_video = fileUrl;
            propertyMedia.propertymedia_img = null; // Ensure the image field is cleared
        }

        propertyMedia.propertyDetails_id = id;
        await propertyMedia.save();

        return res.status(200).json({ message: 'Media updated successfully', propertyMedia });
    } catch (error) {
        next(error);
    }
};

const deletePropertyMedia = async (req, res, next) => {
    const { propertymedia_id } = req.params; // Extract propertymedia_id from the request parameters
    console.log(propertymedia_id,"-----propertymedia_id")
    try {
        // Call the service method to delete the media
        await propertMediaService.deleteMedia(propertymedia_id);

        // Send success response
        return res.status(200).json({ message: 'Media deleted successfully' });

    } catch (error) {
        console.error(error)
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            next(error);  // Pass internal server errors to error-handling middleware
        }
        next(error);
    }
    }

// Controller to get all property details
const getAllPropertymedia = async (req, res) => {
    try {
      const propertyDetails = await propertMediaService.getAllPropertymedia();
      return res.status(200).json({
        success: true,
        data: propertyDetails,
      });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
  };
  
  // Controller to get property details by ID
  const getPropertymediaById = async (req, res) => {
    const { propertyId } = req.params;
    
    try {
      const propertyDetail = await propertMediaService.getPropertymediaById(propertyId);

      return res.status(200).json({
        success: true,
        data: propertyDetail,
      });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
  };    

module.exports= {
    propertMedia_img,
    propertMedia_video,
    updateMediaFile,
    deletePropertyMedia,
    getAllPropertymedia,
    getPropertymediaById,

}