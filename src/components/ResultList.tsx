// ResultList.tsx
import { useState, useEffect } from "react";
import { getResults } from "../services/resultService";

interface Result {
  id: number;
  participant: {
    name: string;
  };
  discipline: {
    name: string;
  };
  resultType: string;
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

  const formatResultValue = (result: Result) => {
    const { resultType, resultValue } = result;
    if (resultType === "time") {
      return `${resultValue} s`;
    } else if (resultType === "distance") {
      return `${resultValue} m`;
    } else if (resultType === "points") {
      return `${resultValue} points`;
    } else {
      return resultValue;
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
              <td className="py-2">{result.participant.name}</td>
              <td className="py-2">{result.discipline.name}</td>
              <td className="py-2">{formatResultValue(result)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
