import { fetchRandomWords } from "@/lib/fetchers/quizFetchers";
import { useSettingsStore } from "@/lib/store/SettingsStore";
import { generateQuizData } from "@/lib/utils";
import mockQuizData from "@/mock/quiz";
import { TQuizCategory, TQuizData } from "@/typings";
import { ChangeEvent, useEffect, useState } from "react";
import NewQuizSetup from "./NewQuizSetup";
import TheQuiz from "./TheQuiz";

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
  const learningLanguage = useSettingsStore((state) => state.learningLanguage);

  const [showTheQuiz, setShowTheQuiz] = useState<boolean>(false);
  const [isQuizLoading, setIsQuizLoading] = useState<boolean>(false);
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

  const [quizData, setQuizData] = useState<TQuizData | undefined>();

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
    if (!showTheQuiz || !learningLanguage) return;

    const generateQuiz = async () => {
      try {
        setIsQuizLoading(true);
        const randomWords = await fetchRandomWords(numberOfQuestions);
        const quizData = await generateQuizData(randomWords, categories, learningLanguage.languageCode);

        const templateData: TQuizData = mockQuizData;

        setQuizData(quizData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsQuizLoading(false);
      }
    };

    generateQuiz();
  }, [showTheQuiz, categories, numberOfQuestions, learningLanguage]);

  console.log("quizData", quizData);

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
        {showTheQuiz ? (
          <TheQuiz quizData={quizData} isQuizLoading={isQuizLoading} />
        ) : (
          <NewQuizSetup
            numberOfQuestions={numberOfQuestions}
            handleNumberOfQuestionsChange={handleNumberOfQuestionsChange}
            categories={categories}
            handleCategoriesChange={handleCategoriesChange}
            setShowTheQuiz={setShowTheQuiz}
            formErrors={formErrors}
          />
        )}
      </div>
    </div>
  );
}
