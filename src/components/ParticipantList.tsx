import { useState, useEffect, ChangeEvent } from "react";
import EditParticipant from "./EditParticipant";
import { getParticipants, deleteParticipant } from "../services/participantService";

interface Participant {
  id: number;
  name: string;
  gender: string;
  age: number;
  club: string;
  disciplines: { id: number; name: string; resultType: string; participants: null }[];
}

export default function ParticipantList() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [editParticipant, setEditParticipant] = useState<Participant | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("");
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    const response = await getParticipants();
    setParticipants(response.data);
    setFilteredParticipants(response.data);
  };

  const handleDelete = async (id: number) => {
    await deleteParticipant(id);
    fetchParticipants();
  };

  const handleEdit = (participant: Participant) => {
    setEditParticipant(participant);
  };

  const handleCloseEdit = () => {
    setEditParticipant(null);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;

    if (option === "") {
      setFilterOption("");
      setFilteredParticipants(participants);
    } else {
      const sortedParticipants = [...participants];

      if (option === "name") {
        sortedParticipants.sort((a, b) => a.name.localeCompare(b.name));
      } else if (option === "name-reverse") {
        sortedParticipants.sort((a, b) => b.name.localeCompare(a.name));
      } else if (option === "gender") {
        sortedParticipants.sort((a, b) => a.gender.localeCompare(b.gender));
      } else if (option === "age") {
        sortedParticipants.sort((a, b) => a.age - b.age);
      } else if (option === "age-reverse") {
        sortedParticipants.sort((a, b) => b.age - a.age);
      } else if (option === "club") {
        sortedParticipants.sort((a, b) => a.club.localeCompare(b.club));
      } else if (option === "club-reverse") {
        sortedParticipants.sort((a, b) => b.club.localeCompare(a.club));
      }

      setFilteredParticipants(sortedParticipants);
      setFilterOption(option);
    }
  };

  const handleDisciplineChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const discipline = event.target.value;
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter((d) => d !== discipline));
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
  };

  const translateGender = (gender: string) => {
    if (gender.toLowerCase() === "male") {
      return "Mand";
    } else if (gender.toLowerCase() === "female") {
      return "Kvinde";
    } else {
      return gender;
    }
  };

  const matchesSelectedDisciplines = (participant: Participant) => {
    if (selectedDisciplines.length === 0) {
      return true;
    }
    for (const discipline of selectedDisciplines) {
      if (participant.disciplines.find((d) => d.name === discipline)) {
        return true;
      }
    }
    return false;
  };

  const applyFilters = () => {
    return filteredParticipants.filter(
      (participant) =>
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        matchesSelectedDisciplines(participant)
    );
  };

  useEffect(() => {
    setFilteredParticipants(applyFilters());
  }, [searchTerm, selectedDisciplines, filterOption]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Deltagerliste</h1>

      <div className="flex items-center mb-4 justify-center">
        <input
          type="text"
          placeholder="Søg efter deltager..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <select
          value={selectedDisciplines}
          onChange={handleDisciplineChange}
          className="ml-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Vælg discipliner</option>
          {participants.map((participant) =>
            participant.disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.name}>
                {discipline.name}
              </option>
            ))
          )}
        </select>

        <select
          value={filterOption}
          onChange={handleFilterChange}
          className="ml-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Vælg sortering/filtering</option>
          <option value="name">Navn (A-Å)</option>
          <option value="name-reverse">Navn (Å-A)</option>
          <option value="gender">Køn</option>
          <option value="age">Alder (Lav til høj)</option>
          <option value="age-reverse">Alder (Høj til lav)</option>
          <option value="club">Klub (A-Å)</option>
          <option value="club-reverse">Klub (Å-A)</option>
        </select>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Navn</th>
            <th className="py-2">Køn</th>
            <th className="py-2">Alder</th>
            <th className="py-2">Klub</th>
            <th className="py-2">Discipliner</th>
            <th className="py-2">Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id} className="text-center">
              <td className="py-2">{participant.name}</td>
              <td className="py-2">{translateGender(participant.gender)}</td>
              <td className="py-2">{participant.age}</td>
              <td className="py-2">{participant.club}</td>
              <td className="py-2">
                {participant.disciplines.map((discipline, index) => (
                  <span key={index}>
                    {`${discipline.name} (${discipline.resultType})`}
                    {index !== participant.disciplines.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td className="py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEdit(participant)}
                >
                  Rediger
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(participant.id)}
                >
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editParticipant && (
        <EditParticipant participant={editParticipant} onClose={handleCloseEdit} />
      )}
    </div>
  );
}
