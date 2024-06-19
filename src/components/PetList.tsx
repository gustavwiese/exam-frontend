// src/components/PetList.tsx
import { useState, useEffect } from "react";
import { getPets, deletePet } from "../services/PetService";
import EditPet from "./EditPet";

export default function PetList() {
  interface Pet {
    id: number;
    name: string;
    type: string;
    owner: string;
  }

  const [pets, setPets] = useState<Pet[]>([]);
  const [editPet, setEditPet] = useState<Pet | null>(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const response = await getPets();
    setPets(response.data);
  };

  const handleDelete = async (id: number) => {
    await deletePet(id);
    fetchPets();
  };

  const handleEdit = (pet: Pet) => {
    setEditPet(pet);
  };

  const handleCloseEdit = () => {
    setEditPet(null); // Close the modal
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Pet List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Type</th>
            <th className="py-2">Owner</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="text-center">
              <td className="py-2">{pet.name}</td>
              <td className="py-2">{pet.type}</td>
              <td className="py-2">{pet.owner}</td>
              <td className="py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEdit(pet)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(pet.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editPet && <EditPet pet={editPet} onClose={handleCloseEdit} />}
    </div>
  );
}
