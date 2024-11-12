import React, { useState, useEffect } from 'react';
import { updateReviews } from './reviewsApi';
import toast from 'react-hot-toast';

const EditReviewModal = ({ review, setIsModalOpen, setReviews,refreshkey }) => {
  const [editReview, setEditReview] = useState({ ...review });

  //  console.log(editReview,"--------------");

  // Fetch username from token if it's not passed as a prop
  useEffect(() => {
   
  }, [ editReview.id]);

  const handleUpdateReview = async () => {
    try {
         
      const response = await updateReviews(editReview);
    
      // Update the reviews list after the edit
      setReviews((prevReviews) => prevReviews.map((rev) =>
      rev.id === editReview.id ? response : rev
      ));
      toast.success("Review updated successfully!");
      setIsModalOpen(false); // Close modal after update
      refreshkey();
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl mb-4">Edit Review</h3>
        <div className="mb-4">
          <input
            type="number"
            min="1"
            max="5"
            value={editReview.rating}
            placeholder='rating 1-5'
            onChange={(e) => setEditReview({ ...editReview, rating: parseInt(e.target.value) })}
            className="p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={editReview.review_text}
            onChange={(e) => setEditReview({ ...editReview, review_text: e.target.value })}
            placeholder='give review'
            className="p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <select
            value={editReview.review_type}
            onChange={(e) => setEditReview({ ...editReview, review_type: e.target.value })}
            className="p-2 w-full"
            placeholder='product-type'
          >
            <option value="OTHER">Other</option>
            <option value="SERVICE">Service</option>
            <option value="PRODUCT">Product</option>
          </select>
        </div>
        <button onClick={handleUpdateReview} className="bg-blue-500 text-white p-2 w-full">Update Review</button>
        <button onClick={() => setIsModalOpen(false)} className="mt-2 text-red-500">Cancel</button>
      </div>
    </div>
  );
};

export default EditReviewModal;
