import { useGlobalStore } from "@/lib/store/SettingsStore";
import { TQuizData } from "@/typings";

type THistoryCardProps = {
  quiz: TQuizData;
};

const HistoryCard = ({ quiz }: THistoryCardProps) => {
  return (
    <div className="bg-neutral-800 rounded-3xl p-6">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-orange-600 mr-2"></div>
        <p className="text-sm font-medium text-neutral-400">By {quiz.createdByUsername}</p>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-4">
        <div className="bg-neutral-700/50 rounded-3xl py-3 px-5">
          <span className="uppercase text-neutral-300 text-xs tracking-wide mb-2">Language</span>

          <p className="text-lg font-medium">{quiz.language.languageName}</p>
        </div>

        <div className="bg-neutral-700/50 rounded-3xl py-3 px-5">
          <span className="uppercase text-neutral-300 text-xs tracking-wide mb-2">Question</span>

          <p className="text-lg font-medium">{quiz.question}</p>
        </div>

        <div className="bg-neutral-700/50 rounded-3xl py-3 px-5">
          <span className="uppercase text-neutral-300 text-xs tracking-wide mb-2">User answer</span>

          <p className="text-lg font-medium">{quiz?.userAnswer ? quiz.userAnswer : "N/A"}</p>
        </div>
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

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {userData?.takenQuizzes.map((quiz, index) => (
            <HistoryCard key={index} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
}
