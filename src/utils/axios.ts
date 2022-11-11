import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACK_END_URI,
  params: {
    api_key: process.env.REACT_APP_BACK_END_API_KEY,
  },
});

const movieDBAxios = {
  axiosInstance,
};
export default movieDBAxios;
