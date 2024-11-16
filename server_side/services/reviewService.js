const Reviews = require('../models/reviewsModel');
const Users = require('../models/userModel');
const { BadRequestError, NotFoundError } = require('../errors/httpErrors'); 

// Create a new review
const createReview = async (reviewData) => {

          // Validate if reviewData is provided
          if (!reviewData || Object.keys(reviewData).length === 0) {
            return res.status(400).json({ message: 'Review data is required in the request body' });
        }

        // Check for required fields (assuming 'user_id', 'content', and 'rating' are required)
        const { user_id,review_text,  rating } = reviewData;
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if (!review_text) {
            return res.status(400).json({ message: 'Review content is required' });
        }
        if (rating == null) {
            return res.status(400).json({ message: 'Rating is required' });
        }

    try {
        // Attempt to create the review
        const newReview = await Reviews.create(reviewData);
        return newReview;
    } catch (error) {
        // Customize the error message and status code if needed
        const errMessage = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
        const customError = new Error(`Error creating review: ${errMessage}`);
        customError.statusCode = 500; // Internal Server Error by default
        throw customError;
    }
};

// const getReviews = async () => {
//     try {
//         const reviews = await Reviews.findAll({
//             include: [{ model: Users }]
//         });
        
//         // If no reviews are found, throw a NotFoundError
//         if (reviews.length === 0) {
//             throw new NotFoundError('No reviews found');
//         }

//         return reviews;
//     } catch (error) {
//         // Set default status code if not already set
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         throw error;
//     }
// };

// Get reviews by userId

const getReviews = async () => {
    try {
        // Fetch reviews with ratings 5, 4, 3, and 1 (with the specified limits)
        const reviews = await Reviews.findAll({
            include: [{ model: Users }],
            where: {
                rating: [5, 4, 3,2, 1] // Filter by specific ratings
            }
        });

        // If no reviews are found, throw a NotFoundError
        if (reviews.length === 0) {
            throw new NotFoundError('No reviews found');
        }

        // Group reviews by rating
        const groupedReviews = {
            5: [],
            4: [],
            3: [],
            2: [],
            1: []
        };

        reviews.forEach((review) => {
            if (groupedReviews[review.rating]) {
                groupedReviews[review.rating].push(review);
            }
        });

        // Now filter the grouped reviews to limit them to the required count
        const limitedReviews = {
            5: groupedReviews[5].slice(0, 2),  // Limit to 3 reviews for rating 5
            4: groupedReviews[4].slice(0, 3),  // Limit to 4 reviews for rating 4
            3: groupedReviews[3].slice(0, 4),  // Limit to 3 reviews for rating 3
            2: groupedReviews[2].slice(0, 2),  // Limit to 2 reviews for rating 2
            1: groupedReviews[1].slice(0, 1),  // Limit to 1 review for rating 1
        };

        // Combine all the reviews together after applying the limit
        const finalReviews = [
            ...limitedReviews[5],
            ...limitedReviews[4],
            ...limitedReviews[3],
            ...limitedReviews[2],
            ...limitedReviews[1],
        ];

        // If no reviews are left after filtering, throw a NotFoundError
        if (finalReviews.length === 0) {
            throw new NotFoundError('No reviews found for the specified ratings');
        }
      
        return finalReviews;
    } catch (error) {
        // Set default status code if not already set

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};


const getReviewById = async (userId) => {
    try {
        const reviews = await Reviews.findAll({
            where: userId ? { user_id: userId } : undefined, // Filter by user_id if provided
            include: [{ model: Users }]
        });

        // If no reviews found, throw a custom NotFoundError
        if (reviews.length === 0) {
            throw new NotFoundError('Reviews not found');
        } 

        return reviews;
    } catch (error) {
         console.log(error,"--------------error")
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};


// Update a review by its ID
const updateReview = async (user_id, reviewData) => {
    console.log(reviewData,"---------------reviewdata");
    try {
        const review = await Reviews.findOne({
            where : {
                user_id : user_id
            }
        });
        console.log(review,"-----------------review");
        if (!review) {
            throw new NotFoundError('Review not found');
        }
        console.log(reviewData.id,"=========id")
         const updatedReview = await review.update(reviewData);
        console.log(updatedReview,"-------------------updatedReview");
        return updatedReview;
    } catch (error) {
        // Throw a specific error message if needed
        throw new Error(`Error updating review: ${error.message}`);
    }
};

// Delete a review by its ID
const deleteReview = async (id) => {
    try {
        // Fetch the review by its primary key (ID)
        const review = await Reviews.findOne({
            where : {
                id : id
            }
        });
        

        // If review is not found, throw a custom error
        if (!review) {
            const error = new Error('Review not found');
            error.statusCode = 404; // Set custom status code for not found
            throw error;
        }

        // Delete the review if found
        await review.destroy();
        return { message: 'Review deleted successfully' };
    } catch (error) {
        // Set default error status if not already specified
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw new Error(`Error deleting review: ${error.message}`);
    }
};



module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
   
};
