import axios from "axios";

export const registerBusiness = async (data) => {
  const url = "https://troxo.runasp.net/api/Users/Register";

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // or response depending on what you want
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};