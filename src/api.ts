// src/api.ts
import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1';

export const getProducts = async () => {
  return axios.get(`${API_URL}/products`);
};

export const getCategories = async () => {
  return axios.get(`${API_URL}/categories`);
};

export const getProductById = async (id: number) => {
  return axios.get(`${API_URL}/products/${id}`);
};

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};


export const register = (email: string, password: string) =>
  axios.post(`${API_URL}/users/`, {
    email,
    password,
  });