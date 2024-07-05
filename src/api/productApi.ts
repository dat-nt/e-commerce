import axios from "axios";
import { Product } from "../types/Product";

const BASE_URL = "https://api.escuelajs.co/api/v1/products/";

export const getProducts = async (params: URLSearchParams): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${BASE_URL}?${params.toString()}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await axios.post(BASE_URL, product);
    return response.data;
};
