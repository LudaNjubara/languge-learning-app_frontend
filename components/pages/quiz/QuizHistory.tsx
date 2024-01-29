import { useGlobalStore } from "@/lib/store/SettingsStore";
import { TQuizData } from "@/typings";

type THistoryCardProps = {
  quiz: TQuizData;
};

const HistoryCard = ({ quiz }: THistoryCardProps) => {
  return (
    <div className="bg-neutral-100/60 rounded-md p-3 mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-orange-600 mr-2"></div>
        <p className="text-lg font-medium">By {quiz.createdByUsername}</p>
      </div>

      <div className="flex items-center">
        <p className="text-lg font-medium">Language: {quiz.language.languageName}</p>
      </div>

      <div className="flex items-center">
        <p className="text-lg font-medium">Question: {quiz.question}</p>
      </div>

      <div className="flex items-center">
        <p className="text-lg font-medium">User answer: {quiz?.userAnswer}</p>
      </div>
    </div>
  );
};

export default function QuizHistory() {
  const userData = useGlobalStore((state) => state.currentUser);

  return (
    <div>
      <div className="py-2">
        <h2 className="relative text-3xl pl-3 font-thin before:absolute before:h-full before:rounded-sm before:w-1 before:bg-orange-600 before:left-0 before:top-0">
          Quiz History
        </h2>
        <p className="text-lg mt-1 text-neutral-400/80 font-light">See your past quiz scores.</p>
      </div>

      <div>
        <>
          {userData?.takenQuizzes.map((quiz, index) => (
            <HistoryCard key={index} quiz={quiz} />
          ))}
        </>
      </div>
    </div>
  );
}
