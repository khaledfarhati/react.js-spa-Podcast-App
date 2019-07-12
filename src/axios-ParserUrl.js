import axios from "axios";
const API_URL = "https://api.rss2json.com/v1";
const instance = axios.create({
  baseURL: API_URL
});
export default instance;
