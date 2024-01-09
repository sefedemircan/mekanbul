import axios from "axios";
export default axios.create({
  baseURL: "https://mekanbul-sefe.vercel.app/api",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  },
});
