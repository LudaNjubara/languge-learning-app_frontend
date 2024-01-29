import { fetchSupportedLanguages } from "@/lib/fetchers/fetchers";
import { TCreateQuizFormData, handleCreateQuiz } from "@/lib/handlers/handlers";
import { TLearningLanguage } from "@/typings";
import { PenIcon, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type TProps = {
  setSelectedScreen: React.Dispatch<
    React.SetStateAction<"new_quiz" | "create_quiz" | "quiz_history" | undefined>
  >;
};

export default function CreateQuiz({ setSelectedScreen }: TProps) {
  const router = useRouter();
  const [language, setLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [tempAnswer, setTempAnswer] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [supportedLanguages, setSupportedLanguages] = useState<TLearningLanguage[]>([]);

  const validateForm = () => {
    if (!language || !question || correctAnswers.length === 0) return false;

    return true;
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...correctAnswers];
    newAnswers[index] = e.target.value;
    setCorrectAnswers(newAnswers);
  };

  const addAnswer = () => {
    setCorrectAnswers([...correctAnswers, tempAnswer]);
    setTempAnswer("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const body: TCreateQuizFormData = {
        languageCode: language,
        question,
        answers: correctAnswers,
      };

      const res = await handleCreateQuiz(body);

      if (!res.ok) throw new Error("Something went wrong while creating the quiz.");

      // Go back to the main quiz screen
      setSelectedScreen(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleRemoveClick = (index: number) => {
    const newAnswers = [...correctAnswers];
    newAnswers.splice(index, 1);
    setCorrectAnswers(newAnswers);
  };

  const handleAnswerBlur = () => {
    setEditingIndex(null);
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      const supportedLanguages = await fetchSupportedLanguages();
      setSupportedLanguages(supportedLanguages);
      setLanguage(supportedLanguages[0].languageCode);
    };
    fetchLanguages();
  }, []);

  return (
    <div>
      <div className="py-2">
        <h2 className="relative text-3xl pl-3 font-thin before:absolute before:h-full before:rounded-sm before:w-1 before:bg-yellow-600 before:left-0 before:top-0">
          Create Quiz
        </h2>
        <p className="text-lg mt-1 text-neutral-400/80 font-light">
          Create a quiz that others can take to learn a language.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <label className="block text-neutral-200">
          <h3 className="text-xl font-medium text-neutral-200">Language</h3>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-3 mt-2 rounded-md bg-neutral-800 text-neutral-200 font-medium placeholder:text-neutral-500"
          >
            <option disabled>Select a language...</option>
            {supportedLanguages.map((language) => (
              <option key={language.languageCode} value={language.languageCode}>
                {language.languageName}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-neutral-200">
          <h3 className="text-xl font-medium text-neutral-200">Question</h3>
          <textarea
            value={question}
            onChange={handleQuestionChange}
            className="w-full p-3 mt-2 rounded-md bg-neutral-800 text-neutral-200 font-medium placeholder:text-neutral-500"
          />
        </label>

        <h3 className="text-xl font-medium text-neutral-200">Answers</h3>
        {correctAnswers.length ? (
          correctAnswers.map((answer, index) => (
            <div key={index} className="flex justify-between items-center gap-4">
              {editingIndex === index ? (
                <textarea
                  value={answer}
                  onChange={handleAnswerChange(index)}
                  onBlur={handleAnswerBlur}
                  className="flex-grow p-3 rounded-md bg-neutral-800 text-neutral-200 font-medium placeholder:text-neutral-500"
                />
              ) : (
                <p className="flex-grow p-3 rounded-md bg-neutral-900 text-neutral-200 font-medium">
                  {answer}
                </p>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => handleEditClick(index)}
                  className="p-2 rounded-full transition-all duration-100 ease-linear cursor-pointer bg-white text-black hover:scale-95"
                >
                  <PenIcon size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveClick(index)}
                  className="ml-2 p-2 rounded-full transition-all duration-100 ease-linear cursor-pointer bg-red-300 text-black hover:scale-95"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-400">No answers yet. Add them below.</p>
        )}
        <div className="flex items-center gap-4">
          <label className="flex-grow flex flex-col text-neutral-200">
            New Answer
            <textarea
              value={tempAnswer}
              onChange={(e) => setTempAnswer(e.target.value)}
              className="p-3 rounded-md bg-neutral-800 text-neutral-200 font-medium placeholder:text-neutral-500"
            />
          </label>
          <button
            type="button"
            onClick={addAnswer}
            disabled={!tempAnswer}
            className={`p-4 rounded-full transition-all duration-100 ease-linear cursor-pointer ${
              !tempAnswer ? "bg-white/5 pointer-events-none" : "bg-white text-black hover:scale-95"
            }`}
          >
            <Plus size={24} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!language || !question || !correctAnswers.length}
          className="block w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}
