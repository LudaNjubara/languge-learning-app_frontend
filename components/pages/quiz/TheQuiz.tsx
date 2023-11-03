import { TQuizData } from "@/typings";

type TTHeQuizProps = {
  quizData: TQuizData | undefined;
  isQuizLoading: boolean;
};

export default function TheQuiz({ quizData, isQuizLoading }: TTHeQuizProps) {
  if (isQuizLoading) return <div>Loading...</div>;

  if (!isQuizLoading && !quizData) return <div>Something went wrong</div>;

  return (
    <div>
      {quizData &&
        Object.entries(quizData).map(([word, value]) => (
          <div key={value.quizQuestion}>
            <h2>{value.quizQuestion}</h2>
            <ul>
              {value.quizAnswers?.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
