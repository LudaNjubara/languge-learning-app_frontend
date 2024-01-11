import { TQuizData } from "@/typings";
import { ArrowRight } from "lucide-react";

type TTHeQuizProps = {
  quizData: TQuizData[] | undefined;
  isQuizLoading: boolean;
};

export default function TheQuiz({ quizData, isQuizLoading }: TTHeQuizProps) {
  if (isQuizLoading) return <div>Loading...</div>;

  if (!isQuizLoading && !quizData) return <div>Something went wrong</div>;

  return (
    <div className="mt-8">
      {quizData?.map((quiz) => (
        <div key={quiz.id.toString()} className="mt-10">
          <span className="text-sm text-white bg-neutral-800 font-semibold px-3 py-1 rounded-full uppercase">
            Question
          </span>
          <h2 className="text-4xl mt-2 text-neutral-300 tracking-normal font-light">{quiz.question}</h2>

          <div className="flex gap-5 items-center mt-5 max-w-6xl">
            <input
              type="text"
              className="flex-grow border border-neutral-700 bg-neutral-900 rounded-full px-5 py-3 placeholder:text-neutral-500"
              placeholder="Your answer..."
            />

            <button className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-neutral-200 px-5 py-3 rounded-full text-lg font-medium transition-colors duration-300">
              Check
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
