import { fetchUserQuizHistory } from "@/lib/handlers/handlers";
import { useEffect, useState } from "react";

export default function QuizHistory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quizzes, setQuizzes] = useState<string[]>([]); // TODO: replace with TQuizHistory or something

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchUserQuizHistory()
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        if (error instanceof Error) setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="py-2">
        <h2 className="relative text-3xl pl-3 font-thin before:absolute before:h-full before:rounded-sm before:w-1 before:bg-orange-600 before:left-0 before:top-0">
          Quiz History
        </h2>
        <p className="text-lg mt-1 text-neutral-400/80 font-light">See your past quiz scores.</p>
      </div>

      <div>
        {loading && <div>Loading...</div>}

        {error && <div>Error: {error}</div>}

        <>
          {quizzes.map((quiz) => (
            <div key={quiz}>{quiz}</div>
          ))}
        </>
      </div>
    </div>
  );
}
