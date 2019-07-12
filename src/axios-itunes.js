import axios from "axios";
const API_URL = "https://itunes.apple.com/lookup";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
//const API_URL = "https://itunes.apple.com/search";
const instance = axios.create({
  baseURL: `${CORS_PROXY}${API_URL}`
});
export default instance;
