import axios from "axios";

// export const baseURL = "http://localhost:3000";
export const baseURL = "https://api.estate.laragrooming.com";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;