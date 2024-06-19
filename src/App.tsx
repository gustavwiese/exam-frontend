// src/App.tsx
import PetList from "./components/PetList";
import AddPet from "./components/AddPet";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="container">
      <Header />
      <div className="mx-auto max-w-[1240px]">
        <AddPet />
        <PetList />
      </div>
    </div>
  );
}
