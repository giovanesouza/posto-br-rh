import api from "./apiRH";

export const login = async (user) => {
  try {
    const response = await api.post("/sign-in", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
