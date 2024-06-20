// ResultList.tsx
import { useState, useEffect } from "react";
import { getResults } from "../services/resultService";

interface Result {
  id: number;
  participantName: string;
  disciplineName: string;
  resultValue: string;
}

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await getResults();
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Resultater</h1>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Deltager</th>
            <th className="py-2">Disciplin</th>
            <th className="py-2">Resultat</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="text-center">
              <td className="py-2">{result.participantName}</td>
              <td className="py-2">{result.disciplineName}</td>
              <td className="py-2">{result.resultValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
