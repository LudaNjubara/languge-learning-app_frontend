import { TQuizCategory } from "@/typings";
import { ChangeEvent } from "react";
import { TCurrentQuizState } from "./NewQuiz";

type TNumberOfQuestionsFormFieldProps = {
  numberOfQuestions: number;
  handleNumberOfQuestionsChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const NumberOfQuestionsFormField = ({
  numberOfQuestions,
  handleNumberOfQuestionsChange,
}: TNumberOfQuestionsFormFieldProps) => {
  return (
    <div>
      <p className="text-neutral-300">Number of questions you&apos;d like in your quiz?</p>
      <div className="flex flex-row gap-2 mt-2">
        <label
          htmlFor="1"
          className={`inline-flex items-center justify-center w-14 h-14 rounded-md border-2 bg-neutral-900 text-neutral-200 p-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-300 ${
            numberOfQuestions === 1 ? "border-green-600" : "border-neutral-300/20"
          }`}
        >
          <input
            type="radio"
            name="number_of_questions"
            id="1"
            value="1"
            className="sr-only"
            onChange={(e) => handleNumberOfQuestionsChange(e)}
          />
          <span className="text-neutral-400 font-medium">1</span>
        </label>
        <label
          htmlFor="3"
          className={`inline-flex items-center justify-center w-14 h-14 rounded-md border-2 bg-neutral-900 text-neutral-200 p-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-300 ${
            numberOfQuestions === 3 ? "border-green-600" : "border-neutral-300/20"
          }`}
        >
          <input
            type="radio"
            name="number_of_questions"
            id="3"
            value="3"
            className="sr-only"
            onChange={(e) => handleNumberOfQuestionsChange(e)}
          />
          <span className="text-neutral-400 font-medium">3</span>
        </label>
        <label
          htmlFor="5"
          className={`inline-flex items-center justify-center w-14 h-14 rounded-md border-2 bg-neutral-900 text-neutral-200 p-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-300 ${
            numberOfQuestions === 5 ? "border-green-600" : "border-neutral-300/20"
          }`}
        >
          <input
            type="radio"
            name="number_of_questions"
            id="5"
            value="5"
            className="sr-only"
            onChange={(e) => handleNumberOfQuestionsChange(e)}
          />
          <span className="text-neutral-400 font-medium">5</span>
        </label>
        <label
          htmlFor="7"
          className={`inline-flex items-center justify-center w-14 h-14 rounded-md border-2 bg-neutral-900 text-neutral-200 p-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-300 ${
            numberOfQuestions === 7 ? "border-green-600" : "border-neutral-300/20"
          }`}
        >
          <input
            type="radio"
            name="number_of_questions"
            id="7"
            value="7"
            className="sr-only"
            onChange={(e) => handleNumberOfQuestionsChange(e)}
          />
          <span className="text-neutral-400 font-medium">7</span>
        </label>
      </div>
    </div>
  );
};

type TCategoriesFormFieldProps = {
  categories: TQuizCategory;
  handleCategoriesChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CategoriesFormField = ({ categories, handleCategoriesChange }: TCategoriesFormFieldProps) => {
  return (
    <div>
      <p className="text-neutral-300">What type of questions would you like in your quiz?</p>
      <div className="flex flex-row gap-2 mt-2">
        <label
          htmlFor="translation"
          className={`inline-flex items-center justify-center py-2 px-5 rounded-full border-2 border-${
            categories.translation ? "green-600" : "neutral-300/20"
          } bg-neutral-900 text-neutral-200 cursor-pointer hover:bg-neutral-800 transition-colors duration-300`}
        >
          <input
            type="checkbox"
            name="translation"
            id="translation"
            checked={categories.translation}
            onChange={handleCategoriesChange}
            className="sr-only"
          />
          <span className="text-neutral-400 font-medium">Translation</span>
        </label>
        <label
          htmlFor="multiple_choice"
          className={`inline-flex items-center justify-center py-2 px-5 rounded-full border-2 border-${
            categories.multiple_choice ? "green-600" : "neutral-300/20"
          } bg-neutral-900 text-neutral-200 p-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-300`}
        >
          <input
            type="checkbox"
            name="multiple_choice"
            id="multiple_choice"
            checked={categories.multiple_choice}
            onChange={handleCategoriesChange}
            className="sr-only"
          />
          <span className="text-neutral-400 font-medium">Multiple Choice</span>
        </label>
        <label
          htmlFor="insert_missing"
          className={`inline-flex items-center justify-center py-2 px-5 rounded-full border-2 border-${
            categories.insert_missing ? "green-600" : "neutral-300/20"
          } bg-neutral-900 text-neutral-200 p-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-300`}
        >
          <input
            type="checkbox"
            name="insert_missing"
            id="insert_missing"
            checked={categories.insert_missing}
            onChange={handleCategoriesChange}
            className="sr-only"
          />
          <span className="text-neutral-400 font-medium">Insert Missing</span>
        </label>
      </div>
    </div>
  );
};

type TNewQuizSetupProps = {
  numberOfQuestions: number;
  handleNumberOfQuestionsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: TQuizCategory;
  handleCategoriesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setCurrentQuizState: (string: TCurrentQuizState) => void;
  formErrors: {
    isNumberOfQuestionsValid: boolean;
    isCategoriesValid: boolean;
  };
};

export default function NewQuizSetup({
  numberOfQuestions,
  handleNumberOfQuestionsChange,
  categories,
  handleCategoriesChange,
  setCurrentQuizState,
  formErrors,
}: TNewQuizSetupProps) {
  return (
    <form className="flex flex-col lg:flex-row gap-5 mt-5">
      <div className="flex flex-col gap-7 lg:w-3/5">
        <div>
          <NumberOfQuestionsFormField
            numberOfQuestions={numberOfQuestions}
            handleNumberOfQuestionsChange={handleNumberOfQuestionsChange}
          />
          {formErrors.isNumberOfQuestionsValid && (
            <p className="text-red-500 text-sm mt-2">Please select a number of questions.</p>
          )}
        </div>

        <div>
          <CategoriesFormField categories={categories} handleCategoriesChange={handleCategoriesChange} />
          {formErrors.isNumberOfQuestionsValid && (
            <p className="text-red-500 text-sm mt-2">Please select at least one category.</p>
          )}
        </div>
      </div>

      <div className="lg:w-2/5 grid place-items-center mt-10 animate-pulse duration-1000">
        <button
          type="button"
          className="w-28 h-28 lg:w-28 lg:h-28 lg:mt-0 rounded-full outline-8 outline-green-600/50 bg-green-600 text-white font-medium hover:bg-green-500 focus:bg-green-500 transition-colors duration-300"
          onClick={() => setCurrentQuizState("loading")}
        >
          Start Quiz
        </button>
      </div>
    </form>
  );
}
