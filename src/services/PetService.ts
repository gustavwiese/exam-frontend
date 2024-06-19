// src/services/PetService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/pets";

export const getPets = async () => {
  return await axios.get(API_URL);
};

export const getPetById = async (id: number) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createPet = async (pet: { name: string; type: string; owner: string }) => {
  return await axios.post(API_URL, pet);
};

export const updatePet = async (id: number, pet: { name: string; type: string; owner: string }) => {
  return await axios.put(`${API_URL}/${id}`, pet);
};

export const deletePet = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};
