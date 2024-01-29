import { fetchQuizData } from "@/lib/fetchers/fetchers";
import { useGlobalStore } from "@/lib/store/SettingsStore";
import { TQuizCategory, TQuizData } from "@/typings";
import { ChangeEvent, useEffect, useState } from "react";
import NewQuizSetup from "./NewQuizSetup";
import TheQuiz from "./TheQuiz";

export type TCurrentQuizState = "setup" | "loading" | "in-progress" | "finished";

const validateForm = (numberOfQuestions: number, categories: TQuizCategory) => {
  let isNumberOfQuestionsValid = false;
  let isCategoriesValid = false;

  if (numberOfQuestions >= 1 && numberOfQuestions <= 7) isNumberOfQuestionsValid = true;

  if (Object.values(categories).some((category) => category === true)) isCategoriesValid = true;

  return {
    isNumberOfQuestionsValid,
    isCategoriesValid,
  };
};

export default function NewQuiz() {
  // zustand state
  const userData = useGlobalStore((state) => state.currentUser);

  const [currentQuizState, setCurrentQuizState] = useState<TCurrentQuizState>("setup");
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(3);
  const [categories, setCategories] = useState<TQuizCategory>({
    translation: true,
    multiple_choice: false,
    insert_missing: false,
  });
  const [formErrors, setFormErrors] = useState({
    isNumberOfQuestionsValid: false,
    isCategoriesValid: false,
  });

  const [quizData, setQuizData] = useState<TQuizData[] | undefined>();

  const handleNumberOfQuestionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = Number(event.target.value);

    if (eventValue === numberOfQuestions) return;

    const { isNumberOfQuestionsValid, isCategoriesValid } = validateForm(eventValue, categories);

    if (!isNumberOfQuestionsValid) {
      setFormErrors((prev) => ({
        ...prev,
        isNumberOfQuestionsValid: false,
      }));
      return;
    }

    if (!isCategoriesValid) {
      setFormErrors((prev) => ({
        ...prev,
        isCategoriesValid: false,
      }));
      return;
    }

    setNumberOfQuestions(eventValue);
  };

  const handleCategoriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { isNumberOfQuestionsValid, isCategoriesValid } = validateForm(numberOfQuestions, {
      ...categories,
      [event.target.name]: event.target.checked,
    });

    if (!isNumberOfQuestionsValid) {
      setFormErrors((prev) => ({
        ...prev,
        isNumberOfQuestionsValid: false,
      }));
      return;
    }

    if (!isCategoriesValid) {
      setFormErrors((prev) => ({
        ...prev,
        isCategoriesValid: false,
      }));
      return;
    }

    setCategories((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  useEffect(() => {
    if (currentQuizState !== "loading" || !userData || !userData?.selectedLanguage) return;

    const generateQuiz = async () => {
      try {
        const quizData = await fetchQuizData(userData.selectedLanguage!.languageCode, numberOfQuestions);

        setQuizData(quizData);
        setCurrentQuizState("in-progress");
      } catch (error) {
        console.log(error);

        setCurrentQuizState("setup");
      }
    };

    generateQuiz();
  }, [currentQuizState, userData?.selectedLanguage]);

  return (
    <div>
      <div className="py-2">
        <h2 className="relative text-3xl pl-3 font-thin before:absolute before:h-full before:rounded-sm before:w-1 before:bg-green-600 before:left-0 before:top-0">
          New Quiz
        </h2>
        <p className="text-lg mt-1 text-neutral-400/80 font-light">
          Start a new quiz to test your knowledge of the language.
        </p>
      </div>

      <div>
        {currentQuizState === "setup" && (
          <NewQuizSetup
            numberOfQuestions={numberOfQuestions}
            handleNumberOfQuestionsChange={handleNumberOfQuestionsChange}
            categories={categories}
            handleCategoriesChange={handleCategoriesChange}
            setCurrentQuizState={setCurrentQuizState}
            formErrors={formErrors}
          />
        )}

        {currentQuizState === "loading" && <div>Loading...</div>}

        {currentQuizState === "in-progress" && (
          <TheQuiz quizData={quizData} setCurrentQuizState={setCurrentQuizState} />
        )}

        {currentQuizState === "finished" && <div>Finished</div>}
      </div>
    </div>
  );
}
