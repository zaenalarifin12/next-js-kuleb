import api from "./api";

export const getUser = () => {
  const token = localStorage.getItem("authToken");

  return api.get(
    "/user",
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
};
