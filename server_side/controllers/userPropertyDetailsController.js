const userPropertyDetailsService = require('../services/userPropertyDetailsService');
const { NotFoundError, BadRequestError, InternalServerError } = require('../errors/httpErrors');

const createUserPropertyDetails = async (req, res,next) => {
    try {
      
        const userPropertyDetail = await userPropertyDetailsService.createUserPropertyDetail(req.body);
        res.status(201).json(userPropertyDetail);
    } catch (error) {
        console.log(error,"-----er")
        res.status(error.statusCode || 500).json({ message: error.message }); if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

const getAllUserPropertyDetails = async (req, res,next) => {
    try {
        const userPropertyDetails = await userPropertyDetailsService.getAllUserPropertyDetails();
        res.status(200).json(userPropertyDetails);
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

const getUserPropertyDetailById = async (req, res) => {
    const {id} = req.body;
   
    try {
        const userPropertyDetail = await userPropertyDetailsService.getUserPropertyDetailById(id);
        res.status(200).json(userPropertyDetail);
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

const updateUserPropertyDetail = async (req, res) => {
   
    try {
        const updatedUserPropertyDetail = await userPropertyDetailsService.updateUserPropertyDetail(req.params.id, req.body);
        res.status(200).json(updatedUserPropertyDetail);
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

const deleteUserPropertyDetail = async (req, res) => {
     const {id} =req.body;
    
    try {
        await userPropertyDetailsService.deleteUserPropertyDetail(id);
        res.status(200).json('Review deleted successfully');
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

 const fecthuserdeatils = async (req,res) =>{
     const {userId} = req.body;
    try {
        const property = await userPropertyDetailsService.getuserById(userId);
        if (!property) throw new NotFoundError('Property not found');
        res.status(200).json({ property });
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




module.exports = {
    createUserPropertyDetails,
    getAllUserPropertyDetails,
    getUserPropertyDetailById,
    updateUserPropertyDetail,
    deleteUserPropertyDetail,
    fecthuserdeatils,
};
