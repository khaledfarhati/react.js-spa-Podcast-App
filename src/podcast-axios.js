import axios from "axios";
const instance = axios.create({
  baseURL: "https://itunes.apple.com/lookup",
  proxy: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080
  }
});
export default instance;
