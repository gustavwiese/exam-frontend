import ParticipantList from "./components/ParticipantList";
import ResultList from "./components/ResultList";
import AddParticipant from "./components/AddParticipant";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="container">
      <Header />
      <div className="mx-auto max-w-[1240px]">
        <AddParticipant />
        <ParticipantList />
        <ResultList />
      </div>
    </div>
  );
}
