import axios from "axios";

const baseURL = 'https://fakestoreapi.in/api';

export const getAllProducts = async () => {
    const url = `${baseURL}/products?limit=500`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    alert("Error fetching products:", error);
  }
};
getAllProducts()
