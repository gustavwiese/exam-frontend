import axios from "axios";

const API_URL = "http://localhost:8080/api/results";

export const getResults = async () => {
  return await axios.get(API_URL);
};
