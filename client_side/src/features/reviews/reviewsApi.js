import axios from 'axios';
import { baseURL } from "../../config/baseURL";

const token = localStorage.getItem("token");


  // Fetch user reviews
   export const fetchUserReviewsById  = async (userId) => {
    
    
    try {
      const response = await axios.get(`${baseURL}/api/review/review/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
       
        if(error.response && error.status === 404 ){
          throw new Error(error.response?.data?.message ||'reviews not found' );;
          }
          else if(error.response && error.status === 403){
            throw new Error(error.response?.data?.message ||'user not found' );;
          }
          else{
             console.error("Error fetching reviews:", error);
             throw new Error(error.response?.data?.message ||'failed to fecth data' );
          }
    }
  };


  // Create a new review
  export const  createReview = async (reviewData) => {
    try {
      const response = await axios.post(`${baseURL}/api/review/reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw new Error(error.response?.data?.message ||'failed to creating a review' );
    }
  };

  //  fetch All UserReviews 
  export const  fetchUserReviews = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/review/reviews`,{
        headers: { Authorization: `Bearer ${token}` },
      });  
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw new Error(error.response?.data?.message ||'failed to fecth all userreviews' );
    }
  };
  //  fetch delete UserReviews by view id
  export const deleteReviews = async (reviewId) => {
    try {
      const response = await axios.delete(`${baseURL}/api/review/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
        
      }); 
    //   console.log(response.data,"----------------");
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw new Error(error.response?.data?.message ||'failed to delete userreviews by viewid ' );
    }
  };
  //  edit reviews by view 
  export const updateReviews = async (editReview) => {
    try {
      const response = await axios.put(`${baseURL}/api/review/reviews`,  {
        id: editReview.id,
        user_id: editReview.user_id,
        rating: editReview.rating,
        review_text: editReview.review_text,
        review_type: editReview.review_type,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw new Error(error.response?.data?.message ||'failed to update the data' );
    }
  };

