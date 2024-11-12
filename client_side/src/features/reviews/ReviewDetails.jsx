import React, { useState, useEffect } from 'react';
import EditReviewModal from './EditReviewModal';
import DeleteReview from './DeleteReviews';
import toast from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/solid';
import { fetchUserReviewsById } from './reviewsApi';


const ReviewDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const token = localStorage.getItem("token");
  const [refreshReviewData, setRefreshReviewData] = useState(0);

  useEffect(() => {
    fetchUserReviews();
  }, [refreshReviewData]);

  const fetchUserReviews = async () => {
    try {
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const response = await fetchUserReviewsById(userId);
      setReviews(response || []);
    } catch (error) {
      console.log(error)
      if(error === 404 || error === 403){
        toast.error('No Reviews Found');
      }else{
        console.error("Error fetching reviews:", error);
        // toast.error("Failed to fetch reviews.");
      }

    }
  };

 

  const renderStars = (rating) => (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
      ))}
    </>
  );

  const handleEdit = (review) => {
    setEditReview(review);
    setIsModalOpen(true);
  };

  const refreshReviewsData = () => {
    setRefreshReviewData(prev => prev + 1);
  };

 
  return (
    <div className="overflow-x-auto flex justify-center items-center min-h-screen p-4">
      {reviews.length === 0 ? (
        <p className="text-center">No reviews found for this user.</p>
      ) : (
        <div className="w-full max-w-4xl mx-auto mt-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-3 px-4 border-b font-semibold text-gray-700">Rating</th>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">Review Text</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                  {/* Rating Column */}
                  <td className="py-4 px-4 border-b text-center">
                    <div className="font-semibold text-gray-800 mb-1">Rating: {review.rating}</div>
                    {renderStars(review.rating)}
                  </td>

                  {/* Review Text Column */}
                  <td className="py-4 px-4 border-b text-gray-700">
                    {/* User Name and Date */}
                    <div className="text-sm text-gray-600 mb-2">
                      {review.User ? review.User.name : "N/A"} &bull; {new Date(review.review_date).toLocaleDateString()}
                    </div>

                    {/* Review Text */}
                    <div className="text-gray-800 mb-3 whitespace-pre-wrap">
                      {review.review_text}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(review)} className="text-blue-500">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <DeleteReview reviewId={review.id} token={token} setReviews={setReviews} reviews={reviews} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <EditReviewModal
          review={editReview}
          setIsModalOpen={setIsModalOpen}
          setReviews={setReviews}
          token={token}
          refreshkey={refreshReviewsData}
        />
      )}
    </div>
  );
};

export default ReviewDetails;
