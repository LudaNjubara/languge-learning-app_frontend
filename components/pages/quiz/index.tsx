"use client";

import { TUserData } from "@/typings";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import NewQuiz from "./NewQuiz";
import QuizHistory from "./QuizHistory";

type TQuizWrapperProps = {
  userData: TUserData;
};

export default function QuizWrapper({ userData }: TQuizWrapperProps) {
  const [selectedScreen, setSelectedScreen] = useState<"new_quiz" | "quiz_history" | undefined>();

  return (
    <div className="mt-12">
      <div
        className={`flex items-center gap-2 py-3 ${selectedScreen ? "animate-fade-in visible" : "invisible"}`}
      >
        <button
          type="button"
          className="flex items-center gap-2 text-white py-1 px-2 rounded hover:bg-neutral-900 transition-colors duration-300"
          onClick={() => setSelectedScreen(undefined)}
        >
          <ArrowLeft size={20} />
          Go back
        </button>
      </div>

      {!selectedScreen && (
        <div className="flex flex-col md:flex-row gap-1 max-w-6xl mx-auto min-h-[450px] m-5 rounded-xl h-10 overflow-hidden hover:gap-10 transition-all duration-200">
          <button
            type="button"
            className="w-full md:w-1/2 h-full text-black font-medium text-2xl bg-neutral-200 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white outline-none transition-colors duration-300"
            onClick={() => setSelectedScreen("new_quiz")}
          >
            New quiz
          </button>

          <button
            type="button"
            className="w-full md:w-1/2 h-full text-black font-medium text-2xl bg-neutral-200 hover:bg-orange-600 hover:text-white focus:bg-orange-600 focus:text-white outline-none transition-colors duration-300"
            onClick={() => setSelectedScreen("quiz_history")}
          >
            Quiz history
          </button>
        </div>
      )}

      {selectedScreen === "new_quiz" && <NewQuiz userData={userData} />}

      {selectedScreen === "quiz_history" && <QuizHistory userData={userData} />}
    </div>
  );
}
