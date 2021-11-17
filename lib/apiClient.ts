import axios, { AxiosRequestConfig } from "axios";

// http://localhost:3080
const host =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API_SERVER
    : process.env.REACT_APP_PRODUCTION_API_SERVER;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1YjAwYmM3LTJlMjYtNDkxZi1hMTNmLTA3NzRkZDZlZjI2NSIsImlhdCI6MTYzNjYyNzMyNH0.Ox0yT31SFOw8Z-aercA_g5WSVq7x40E4ZFLp6OkHRVQ";

const apiClient = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token || ""}`,
  },
});

export default apiClient;

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();
const RELOAD_TARGET_URL = ["/user/me", "/user/profile/random"];

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const rawToken = (config.headers.Authorization as string).split(" ");

  if (token && !rawToken[1] && RELOAD_TARGET_URL.includes(config.url!)) {
    console.log("got you");
    source.cancel("Request cancelled, Because token was not reflected");
    //window.location.reload();
  }
  return config;
});
