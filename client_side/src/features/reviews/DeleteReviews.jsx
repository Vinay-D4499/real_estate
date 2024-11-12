import React from 'react';
import toast from 'react-hot-toast'; // Import toast for notifications
import {TrashIcon} from '@heroicons/react/24/solid';
import { deleteReviews } from './reviewsApi';



const DeleteReview = ({ reviewId,  setReviews, reviews }) => {
  
  const handleDelete = async (reviewId) => {
    try {
       await deleteReviews(reviewId);
      // Update the reviews state to reflect the deletion
      setReviews(reviews.filter((review) => review.id !== reviewId));
      toast.success("Review deleted successfully!"); // Success toast for deletion
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review.");
    }
  };

  return (
    <button
      onClick={() => handleDelete(reviewId)} // Call handleDelete when clicked
      className="text-red-500"
    >
      {/* Trash Icon or Text */}
      <span className="h-5 w-5"> <TrashIcon className="h-5 w-5" /></span>
    </button>
  );
};

export default DeleteReview;
