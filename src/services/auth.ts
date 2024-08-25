import api from "./api";

export const login = (credentials: { email: string; password: string }) => {
  return api.post("/login", credentials);
};

export const register = (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  return api.post("/register", credentials);
};
