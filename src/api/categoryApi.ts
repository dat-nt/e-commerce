import axios from "axios";
import { Category } from "../types/Category";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const getCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(`${BASE_URL}/categories`);
    return response.data;
};

export const addCategory = async (category: Omit<Category, "id">) => {
    const response = await axios.post(`${BASE_URL}/categories/`, category);
    return response.data;
};
