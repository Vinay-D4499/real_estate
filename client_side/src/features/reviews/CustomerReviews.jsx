import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from "../../../src/config/baseURL"; 

const CustomerReviews = () => {
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewResponse = await axios.get(`${baseURL}/api/review/reviews`);
        const reviewsData = reviewResponse.data;
        setReviews(reviewsData);
        calculateRatingDistribution(reviewsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    const calculateRatingDistribution = (reviews) => {
      const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviews.forEach((review) => {
        if (review.rating >= 1 && review.rating <= 5) {
          ratingCounts[review.rating]++;
        }
      });

      const totalReviews = reviews.length;
      const distribution = {};
      for (let rating = 1; rating <= 5; rating++) {
        distribution[rating] = totalReviews
          ? ((ratingCounts[rating] / totalReviews) * 100).toFixed(2)
          : 0;
      }

      setRatingDistribution(distribution);
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Array(rating).fill('★');
    const emptyStars = Array(5 - rating).fill('☆');
    return [...fullStars, ...emptyStars].join('');
  };

  const getDefaultValue = (value, defaultValue = "N/A") => {
    return value ? value : defaultValue;
  };

  const sortedReviews = reviews.sort((a, b) => b.rating - a.rating);

  const backgroundColors = [
    'bg-yellow-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-red-100',
    'bg-purple-100',
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sortedReviews.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sortedReviews.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      {/* Rating Distribution Section */}
      <h2 className="text-lg font-semibold mb-4 h-10">Rating Distribution</h2>
      <div className="space-y-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="flex items-center text-xs">
            <span className="mr-1 text-base">{renderStars(rating)}</span>
            <div className="w-1/4 bg-gray-300 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${ratingDistribution[rating]}%` }}
              />
            </div>
            <span className="ml-1">{ratingDistribution[rating]}%</span>
          </div>
        ))}
      </div>

      {/* Carousel Section for Reviews */}
      <h2 className="text-lg font-semibold mb-4 mt-8">Top Reviews</h2>
      <div className="relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          &#9664;
        </button>
        
        {sortedReviews.slice(currentIndex, currentIndex + 1).map((review, index) => {
          const customer = review.User;
          const randomBackgroundColor = backgroundColors[index % backgroundColors.length];

          return (
            <div
              key={review.id}
              className={`relative p-4 rounded-lg shadow-md ${randomBackgroundColor} mx-4 w-full sm:max-w-sm`}
            >
              {/* Profile Picture in Top Left Corner */}
              <img
                src={
                  customer.profile_picture_url ||
                  'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'
                }
                alt="Customer Avatar"
                className="w-12 h-12 rounded-full object-cover absolute top-2 left-2 border-2 border-white"
              />
              
              {/* Review Content */}
              <div className="ml-16"> {/* Adds space for the picture */}
                <p className="text-xl font-semibold mb-1">{getDefaultValue(customer.name)}</p>
                <p className="text-lg font-medium text-yellow-500 mb-1">
                  {renderStars(review.rating)}
                </p>
                <p className="text-gray-700 mb-1">{getDefaultValue(review.review_text)}</p>
                <div className="text-sm text-gray-400">
                  <span>{new Date(review.review_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={nextSlide}
          className="absolute right-0 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          &#9654;
        </button>
      </div>

      {/* Carousel Indicator */}
      <div className="flex justify-center mt-4">
        {sortedReviews.map((_, index) => (
          <span
            key={index}
            className={`mx-1 h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;

