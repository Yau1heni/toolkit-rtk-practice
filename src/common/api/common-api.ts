import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_BACK_URL,
  withCredentials: true,
});
