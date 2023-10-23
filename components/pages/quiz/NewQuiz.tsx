import { TUserData } from "@/typings";

type TNewQuizProps = {
  userData: TUserData;
};

export default function NewQuiz({ userData }: TNewQuizProps) {
  return (
    <div>
      <div className="py-2">
        <h2 className="relative text-3xl pl-3 font-thin before:absolute before:h-full before:rounded-sm before:w-1 before:bg-green-600 before:left-0 before:top-0">
          New Quiz
        </h2>
        <p className="text-lg mt-1 text-neutral-400/80 font-light">
          Test your knowledge of the language by answering questions.
        </p>
      </div>

      <main></main>
    </div>
  );
}
