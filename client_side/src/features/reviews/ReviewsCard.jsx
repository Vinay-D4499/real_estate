
import React from 'react'
import CreateReview from './CreateReview'
import ReviewDetails from './ReviewDetails'



const ReviewsCard = () => {
  return (
    <>
      <div className='container bg-gray-100'>
        <CreateReview />
        <ReviewDetails />
      </div>
    </>
  );
};


export default ReviewsCard
