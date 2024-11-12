const express = require('express');
const reviewController = require('../controllers/reviewController');
const reviewrouter = express.Router();
const verifyToken = require('../middlewares/authMiddleware');


// POST: Create a new review
reviewrouter.post('/reviews', reviewController.createReview);

// GET: Retrieve all reviews 
reviewrouter.get('/reviews', reviewController.getReviews);

// GET: Retrieve a single review by ID
reviewrouter.get('/review/:userId', verifyToken,reviewController.getReviewById);

// PUT: Update a review by ID
reviewrouter.put('/reviews', verifyToken,reviewController.updateReview);

// DELETE: Delete a review by ID
reviewrouter.delete('/reviews/:id', verifyToken,reviewController.deleteReview);



module.exports = reviewrouter;
