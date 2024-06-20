import axios from "axios";

const API_URL = "http://localhost:8080/api/participants";

export const getParticipants = async () => {
  return await axios.get(API_URL);
};

export const getParticipantById = async (id: number) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createParticipant = async (participant: {
  name: string;
  gender: string;
  age: string;
  club: string;
}) => {
  return await axios.post(API_URL, participant);
};

export const updateParticipant = async (
  id: number,
  participant: { name: string; gender: string; age: number; club: string }
) => {
  return await axios.put(`${API_URL}/${id}`, participant);
};

export const deleteParticipant = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};
