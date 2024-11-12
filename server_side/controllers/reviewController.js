const reviewService = require('../services/reviewService');
const Reviews = require('../models/reviewsModel');

// Controller to handle creating a new review
const createReview = async (req, res) => {
    try {
        const reviewData = req.body;

        // Call the service to create the new review
        const newReview = await reviewService.createReview(reviewData);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Controller to get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getReviews();
        
        res.status(200).json(reviews);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};


// Controller to fetch a single review by ID
const getReviewById = async (req, res) => {
    try {
        const {userId} = req.params; // Use params
        // console.log(userId,"-------usedid");
        // Check if userId is provided
        if (!userId) {
            return res.status(403).json({ message: 'userId not found' });
        }

        // Fetch reviews by userId
        const reviews = await reviewService.getReviewById(userId);
        // console.log(reviews, "=========>reviews");

        // Check if reviews array is empty
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'Reviews not found' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};


// Controller to update a review by ID
const updateReview = async (req, res) => {
    
    try {
        const user_id = req.user;
        const reviewData = req.body;
        // Check if reviewId is provided in params
        if (!user_id) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Check if reviewData is provided in body
        if (!reviewData || Object.keys(reviewData).length === 0) {
            return res.status(400).json({ message: 'Review data is required in the request body' });
        }

        const updatedReview = await reviewService.updateReview(user_id, reviewData);
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Controller to delete a review by ID
const deleteReview = async (req, res) => {
    try {
        const {id} = req.params;
       
        // Check if reviewId is provided in params
        if (!id) {
            return res.status(400).json({ message: 'Review ID is required in the URL parameters' });
        }


        // Call the service to delete the review
        const result = await reviewService.deleteReview(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};





module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
}
