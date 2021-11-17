import axios, { AxiosRequestConfig } from "axios";

// http://localhost:3080
const host =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API_SERVER
    : process.env.REACT_APP_PRODUCTION_API_SERVER;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1YjAwYmM3LTJlMjYtNDkxZi1hMTNmLTA3NzRkZDZlZjI2NSIsImlhdCI6MTYzNjYyNzMyNH0.Ox0yT31SFOw8Z-aercA_g5WSVq7x40E4ZFLp6OkHRVQ";

const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token || ""}`,
  },
});

export default apiClient;
