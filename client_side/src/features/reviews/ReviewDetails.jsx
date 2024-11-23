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
    <div className="flex justify-center items-center p-1 min-h-screen overflow-x-auto">
      {reviews.length === 0 ? (
        <p className="text-center">No reviews found for this user.</p>
      ) : (
        <div className="mx-auto mt-2 w-full max-w-4xl">
          <table className="border-gray-200 bg-white shadow-md border rounded-lg min-w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-3 border-b font-semibold text-gray-700">Rating</th>
                <th className="px-4 py-3 border-b font-semibold text-gray-700">Review Text</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                  {/* Rating Column */}
                  <td className="px-4 py-4 border-b text-center">
                    <div className="mb-1 font-semibold text-gray-800">Rating: {review.rating}</div>
                    {renderStars(review.rating)}
                  </td>

                  {/* Review Text Column */}
                  <td className="px-4 py-4 border-b text-gray-700">
                    {/* User Name and Date */}
                    <div className="mb-2 text-center text-gray-600 text-sm">
                      {review.User ? review.User.name : "N/A"} &bull; {new Date(review.review_date).toLocaleDateString()}
                    </div>

                    {/* Review Text */}
                    <div className="mb-3 text-center text-gray-800 whitespace-pre-wrap">
                      {review.review_text}
                    </div>

                    {/* Actions */}
                    <div className="space-x-2 text-center">
                      <button onClick={() => handleEdit(review)} className="text-blue-500 text-center">
                        <PencilIcon className="w-5 h-5" />
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
