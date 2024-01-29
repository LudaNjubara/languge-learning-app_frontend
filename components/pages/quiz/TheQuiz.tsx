import { MAX_NUM_OF_TRIES_PER_QUESTION } from "@/lib/constants/consts";
import { handleSubmitFinishedQuiz } from "@/lib/handlers/handlers";
import { TQuizAnswer, TQuizData } from "@/typings";
import { ArrowRight } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TCurrentQuizState } from "./NewQuiz";

type TQuizCardProps = {
  quiz: TQuizData;
  setTotalNumOfTries: Dispatch<SetStateAction<number>>;
  setQuizDataToSubmit: Dispatch<SetStateAction<TQuizDataToSubmit[]>>;
};

const QuizCard = ({ quiz, setTotalNumOfTries, setQuizDataToSubmit }: TQuizCardProps) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [numberOfTries, setNumberOfTries] = useState<number>(MAX_NUM_OF_TRIES_PER_QUESTION);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(undefined);

  const hasMoreTries = numberOfTries > 0;

  useEffect(() => {
    setTotalNumOfTries((prev) => {
      if (numberOfTries === 1) return prev + 1;
      return prev;
    });
  }, [numberOfTries]);

  const checkAnswer = (userAnswer: string, correctAnswers: TQuizAnswer[]) => {
    if (!hasMoreTries) return;

    const correctAnswer = correctAnswers.find(
      (answer) => answer.answer.toLowerCase() === userAnswer.toLowerCase()
    );

    if (correctAnswer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }

    setNumberOfTries((prev) => prev - 1);
    // find and replace existing quiz data if it exists, otherwise add new quiz data
    setQuizDataToSubmit((prev) => {
      const quizDataToSubmit = prev.find((quizToSubmit) => quizToSubmit.quizId === quiz.id);

      if (quizDataToSubmit) {
        return prev.map((quizToSubmit) => {
          if (quizToSubmit.quizId === quiz.id) {
            return {
              ...quizToSubmit,
              answer: userAnswer,
            };
          }
          return quizToSubmit;
        });
      }

      return [
        ...prev,
        {
          quizId: quiz.id,
          answer: userAnswer,
        },
      ];
    });
  };

  return (
    <div key={quiz.id.toString()} className="mt-5 py-5 px-8 bg-neutral-900 rounded-3xl">
      <span className="text-sm text-white bg-neutral-800 font-semibold px-3 py-1 rounded-full uppercase">
        Question
      </span>
      <h2 className="text-4xl mt-2 text-neutral-300 tracking-normal font-light">{quiz.question}</h2>

      <div className="flex gap-5 items-center mt-5 max-w-6xl">
        <input
          type="text"
          className={`flex-grow border-2 border-neutral-700 bg-neutral-900 rounded-full px-5 py-3 placeholder:text-neutral-500 ${
            isAnswerCorrect === false && "border-red-500/60"
          }`}
          placeholder="Your answer..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={!hasMoreTries}
        />

        <button
          type="button"
          className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-neutral-200 px-5 py-3 rounded-full text-lg font-medium transition-colors duration-300 disabled:bg-neutral-700 disabled:cursor-not-allowed"
          onClick={() => checkAnswer(userAnswer, quiz.answers)}
          disabled={!hasMoreTries}
        >
          Check
          <ArrowRight size={20} />
        </button>
      </div>

      <span className="block mt-5 text-neutral-400">
        {numberOfTries > 0 && numberOfTries <= 2
          ? `You have ${numberOfTries} tries left.`
          : "You have no more tries left."}
      </span>
    </div>
  );
};

type TTheQuizProps = {
  quizData: TQuizData[] | undefined;
  setCurrentQuizState: (state: TCurrentQuizState) => void;
};

export type TQuizDataToSubmit = {
  quizId: number;
  answer: string;
};

export default function TheQuiz({ quizData, setCurrentQuizState }: TTheQuizProps) {
  const [quizDataToSubmit, setQuizDataToSubmit] = useState<TQuizDataToSubmit[]>([]);
  const [totalNumOfTries, setTotalNumOfTries] = useState<number>(0);

  const isQuizSubmittable = totalNumOfTries === quizData?.length;

  const handleSubmitQuiz = async () => {
    console.log("Submitting quiz...");

    try {
      const res = await handleSubmitFinishedQuiz(quizDataToSubmit);

      if (res.status !== 200) throw new Error("Something went wrong while submitting the quiz.");

      setCurrentQuizState("finished");
    } catch (error) {
      console.log(error);
      setCurrentQuizState("setup");
    }
  };

  if (!quizData) return <div>Something went wrong</div>;

  return (
    <div className="mt-8">
      {quizData?.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          setTotalNumOfTries={setTotalNumOfTries}
          setQuizDataToSubmit={setQuizDataToSubmit}
        />
      ))}

      <div className="mt-16 ml-auto">
        <span className={`text-normal ${isQuizSubmittable ? "text-neutral-400" : "text-neutral-600"}`}>
          {isQuizSubmittable
            ? "You can submit your quiz now or try a few more times."
            : "You can't submit your quiz yet. Please answer all questions."}
        </span>
        <button
          type="button"
          className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-neutral-200 px-5 py-3 rounded-full text-lg font-medium transition-colors duration-300 disabled:bg-neutral-700 disabled:cursor-not-allowed mt-5"
          disabled={!isQuizSubmittable}
          onClick={handleSubmitQuiz}
        >
          Submit quiz
        </button>
      </div>
    </div>
  );
}
