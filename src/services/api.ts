import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.16:3333",
});

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      console.log("interceptor response error => ", error);
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
