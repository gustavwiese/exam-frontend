import React, { useState } from "react";
import { updateParticipant } from "../services/participantService";

interface Discipline {
  id: number;
  name: string;
}

interface EditParticipantProps {
  participant: {
    id: number;
    name: string;
    gender: string;
    age: number;
    club: string;
    disciplines: Discipline[];
  };
  onClose: () => void; // Function to close the modal
}

export default function EditParticipant({ participant, onClose }: EditParticipantProps) {
  const [name, setName] = useState(participant.name);
  const [gender, setGender] = useState(participant.gender);
  const [age, setAge] = useState<number>(Number(participant.age));
  const [club, setClub] = useState(participant.club);
  const [disciplines, setDisciplines] = useState<Discipline[]>(participant.disciplines);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateParticipant(participant.id, { name, gender, age, club, disciplines });
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating participant:", error);
      // Handle error as needed (e.g., show error message to user)
    }
  };

  const handleCancel = () => {
    onClose(); // Close the modal after update
  };

  const handleDisciplineChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDisciplines = [...disciplines];
    updatedDisciplines[index].name = e.target.value;
    setDisciplines(updatedDisciplines);
  };

  const addDiscipline = () => {
    const newDiscipline: Discipline = { id: 0, name: "" }; // Adjust as per your data structure
    setDisciplines([...disciplines, newDiscipline]);
  };

  const removeDiscipline = (index: number) => {
    const updatedDisciplines = [...disciplines];
    updatedDisciplines.splice(index, 1);
    setDisciplines(updatedDisciplines);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-screen overflow-y-auto pb-6">
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Discipliner</label>
            {disciplines.map((discipline, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={discipline.name}
                  onChange={(e) => handleDisciplineChange(index, e)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => removeDiscipline(index)}
                >
                  Fjern
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={addDiscipline}
            >
              Tilføj discipline
            </button>
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
