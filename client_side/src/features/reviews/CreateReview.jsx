import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { createReview, fetchUserReviewsById } from "./reviewsApi";


const CreateReview = () => {
  const [reviews, setReviews] = useState([]); // Store reviews
  const [newReview, setNewReview] = useState({
    rating: 0,
    review_text: "",
    review_type: "OTHER",
  });
  const [message, setMessage] = useState(""); // Message for validation
  const [token, setToken] = useState(localStorage.getItem("token")); // Store token
  const [userId, setUserId] = useState(null); // Store user ID from token
  
  // Get user ID from token
  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.id); // Set userId from decoded token
    }
  }, [token]);

  // Fetch user reviews
  useEffect(() => {
    if (userId) {
      fetchUserReviews();
    }
  }, [userId]);

  // Fetch user reviews from backend
  const fetchUserReviews = async () => {
    try {
        
      const response = await fetchUserReviewsById(userId);
      setReviews(response|| []); // Set reviews data
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // toast.error("Failed to fetch reviews.");
    }
  };

  // Handle creating a review
  const handleCreateReview = async () => {
  
    setMessage(""); // Clear message

    // Validate the rating to ensure it is between 1 and 5
    if (newReview.rating < 1 || newReview.rating > 5) {
      setMessage("Rating must be between 1 and 5.");
      return;
    }

    try { 
         const response = await createReview({ rating: newReview.rating,
            review_text: newReview.review_text,
            review_type: newReview.review_type,
            user_id: userId,});
         console.log(response,"--------creat")
      // Update reviews without refreshing the page
      setReviews([response, ...reviews]); 
      setNewReview({ rating: 0, review_text: "", review_type: "OTHER" }); // Reset form
      toast.success("Review created successfully!");
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error("Failed to create review.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 shadow-lg mx-auto mt-6 rounded-lg w-full max-w-lg">
      <div className="w-full">
        <h2 className="mb-4 font-semibold text-2xl text-center">Create a Review</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="rating" className="block font-medium text-gray-700 text-sm">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              placeholder="Enter rating (1-5)"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              className="border-gray-300 mt-2 p-3 border rounded-lg w-full"
            />
          </div>

          <div>
            <label htmlFor="reviewText" className="block font-medium text-gray-700 text-sm">Review Text</label>
            <textarea
              id="reviewText"
              placeholder="Write your review"
              value={newReview.review_text}
              onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
              className="border-gray-300 mt-2 p-3 border rounded-lg w-full"
            />
          </div>

          <div>
            <label htmlFor="reviewType" className="block font-medium text-gray-700 text-sm">Review Type</label>
            <select
              id="reviewType"
              value={newReview.review_type}
              onChange={(e) => setNewReview({ ...newReview, review_type: e.target.value })}
              className="border-gray-300 mt-2 p-3 border rounded-lg w-full"
            >
              <option value="OTHER">Other</option>
              <option value="SERVICE">Service</option>
              <option value="PRODUCT">Product</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleCreateReview}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white transition duration-200"
            >
              Submit Review
            </button>
          </div>

          {message && <p className="mt-2 text-center text-red-500 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateReview;

