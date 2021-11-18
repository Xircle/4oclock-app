export const BASE_URL = "https://xircle-alpha-server.herokuapp.com";

export let TOKEN = "";

export const setTOKEN = (token: string) => {
  TOKEN = token;
};

export const getTOKEN = () => {
  return TOKEN;
};
