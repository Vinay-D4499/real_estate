const { NotFoundError, InternalServerError } = require('../errors/httpErrors');
const propertyMedia = require('../models/propertyMedia')
const PropertyDetails = require('../models/propertyDetailsModel')

const propertymedia_img = async (property_type_id, propertymedia_img) => {
    try {
        console.log(property_type_id, "-------serid")
        console.log(propertymedia_img, "-------serimg")
        if (!property_type_id) {
            throw new NotFoundError('property_id not found');
        }
        if (!propertymedia_img) {
            throw new NotFoundError('property_img not found');
        }
        const property = await propertyMedia.create({ propertymedia_img: propertymedia_img, propertyDetails_id: property_type_id });
        console.log(property, "--------------------------->")
        if (!property) {
            throw new NotFoundError('property not found');
        }

        return property;
    } catch (error) {
        console.log(error, "-------error")
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};
const propertymedia_video = async (propertymedia_video, property_type_id) => {
    try {

        const property = await propertyMedia.create({ propertymedia_video: propertymedia_video, propertyDetails_id: property_type_id });

        if (!property) {
            throw new NotFoundError('property not found');
        }

        return property;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};



const checkPropertyMediaExists = async (propertymedia_id) => {
    const propertyMedia = await propertyMedia.findByPk(propertymedia_id);
    if (!propertyMedia) {
        throw new Error("PropertyMedia not found");
    }
    return propertyMedia;
};

const checkPropertyDetailsExists = async (propertyDetails_id) => {
    const propertyDetails = await PropertyDetails.findByPk(propertyDetails_id);
    if (!propertyDetails) {
        throw new Error("PropertyDetails not found");
    }
    return propertyDetails;
};

const updatePropertyMediaService = async (propertymedia_id, propertyDetails_id, mediaUrl) => {
    const propertyMedia = await checkPropertyMediaExists(propertymedia_id);
    await checkPropertyDetailsExists(propertyDetails_id);

    propertyMedia.propertyDetails_id = propertyDetails_id;
    propertyMedia.propertymedia_img = mediaUrl;
    await propertyMedia.save();

    return propertyMedia;
};


const deleteMedia = async (propertymedia_id) => {
    try {

        if (!propertymedia_id) {
            throw new NotFoundError('id is required')
        }
        // Check if the media exists in the database
        const media = await propertyMedia.findOne({ where: { propertymedia_id } });
        if (!media) {
            throw new NotFoundError('media not found');
        }
        // Delete the media from the database
        await propertyMedia.destroy({
            where: { propertymedia_id: propertymedia_id }
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}


// Service method to get all property details
const getAllPropertymedia = async () => {
    try {
        const propertyDetails = await propertyMedia.findAll();
        if (!propertyDetails) {
            throw new NotFoundError('media not found');
        }

        return propertyDetails;
    } catch (error) {
        console.error('Error fetching all property details:', error);
        throw new InternalServerError('Unable to fetch property details');
    }
};

// Service method to get property details by ID
const getPropertymediaById = async (propertyId) => {
    try {
        const propertyDetail = await propertyMedia.findAll({
            where: { propertymedia_id: propertyId }
        });
        if (!propertyDetail) {
            throw new NotFoundError('not found media');
        }

        return propertyDetail;
    } catch (error) {
        console.error('Error fetching property details by ID:', error);
        throw new Error('Unable to fetch property details by ID');
    }
};

module.exports = {
    propertymedia_img,
    propertymedia_video,
    updatePropertyMediaService,
    deleteMedia,
    getAllPropertymedia,
    getPropertymediaById,

}