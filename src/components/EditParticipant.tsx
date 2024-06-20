import React, { useState } from "react";
import { updateParticipant } from "../services/participantService";

interface EditParticipantProps {
  participant: {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
  };
  onClose: () => void; // Function to close the modal
}

export default function EditParticipant({ participant, onClose }: EditParticipantProps) {
  const [name, setName] = useState(participant.name);
  const [gender, setGender] = useState(participant.gender);
  const [age, setAge] = useState<number>(Number(participant.age));
  const [club, setClub] = useState(participant.club);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateParticipant(participant.id, { name, gender, age, club });
    onClose(); // Close the modal after update
  };

  const handleCancel = () => {
    onClose(); // Close the modal after update
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Rediger deltager</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Navn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Køn</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Alder</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Klub</label>
            <input
              type="text"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Gem
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Annuller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
