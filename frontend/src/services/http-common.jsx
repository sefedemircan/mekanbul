import axios from "axios";
export default axios.create({
<<<<<<< HEAD
  baseURL: "https://mekanbul-sefe.vercel.app/api/venues",
=======
  baseURL: "https://mekanbul-sefe-backend.vercel.app/api",
>>>>>>> 34d29964d46387ef821f63de0836c4d0627b4129
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  },
});
