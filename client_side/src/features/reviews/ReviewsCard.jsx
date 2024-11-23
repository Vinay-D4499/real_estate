import React from 'react'
import CreateReview from './CreateReview'
import ReviewDetails from './ReviewDetails'
import CustomerReviews from './CustomerReviews';



const ReviewsCard = () => {
  return (
    <>
      <div className='container bg-gray-100'>
        <CustomerReviews />
        <CreateReview />
        <ReviewDetails />
      </div>
    </>
  );
};


export default ReviewsCard
