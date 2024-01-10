import mockLanguages from "@/mock/languages"
import { TLanguageApiResponse, TQuizCategory, TQuizData } from "@/typings"
import { LEXICALA_API_URL, lexicalaHeaders } from "../constants/consts"
import { fetchDictionaryData } from "../fetchers/quizFetchers"


const fetchAllLanguages = async (): Promise<TLanguageApiResponse> => {
    if (process.env.NODE_ENV === 'development') return mockLanguages

    const res = await fetch(`${LEXICALA_API_URL}/languages`, {
        method: 'GET',
        headers: lexicalaHeaders,
    })

    if (!res.ok) throw new Error(res.statusText)


    return res.json()
}

const calculateWordsToExtract = (answer: string) => {
    const words = answer.split(" ");
    const filteredWords = words.filter(word => word.length > 3);
    let numOfWordsToExtract = Math.ceil(filteredWords.length / 2);

    if (numOfWordsToExtract > 3) numOfWordsToExtract = 3;

    return {
        numOfWordsToExtract,
        filteredWords
    }
}

const formatWord = (word: string, extractedWords: string[]): string => {
    return extractedWords.includes(word) ? "______" : word;
}

const formatAnswer = (answer: string, extractedWords: string[]): string => {
    const words = answer.split(" ");
    const formattedWords = words.map(word => formatWord(word, extractedWords));
    return formattedWords.join(" ");
}

const formatQuizAnswersByCategory = (quizAnswers: string[], category: keyof TQuizCategory) => {
    const formattedAnswers = quizAnswers.map((answer) => {
        switch (category) {
            case "translation":
                return answer;
            case "multiple_choice":
                return answer;
            case "insert_missing":
                const { numOfWordsToExtract, filteredWords } = calculateWordsToExtract(answer);

                const extractedWords: string[] = [];

                for (let i = 0; i < numOfWordsToExtract; i++) {
                    const randomWordIndex = Math.floor(Math.random() * filteredWords.length);
                    const randomWord = filteredWords[randomWordIndex];

                    extractedWords.push(randomWord);
                }

                const formattedAnswer = formatAnswer(answer, extractedWords);

                return formattedAnswer;
            default:
                return answer;
        }
    })

    return formattedAnswers;
}

const createQuizQuestion = async (word: string) => {
    const dictionaryWords = await fetchDictionaryData(word)

    // create a quiz question by randomly selecting a sense and its first example text
    const sensesCount = dictionaryWords[0].senses.length;
    const randomSenseIndex = Math.floor(Math.random() * sensesCount);

    const quizQuestion = dictionaryWords[0].senses[randomSenseIndex].examples?.[0].text;

    return quizQuestion;
}

const assignCategoryToQuizQuestion = (
    categoryKeys: string[],
    categoryUses: number[],
    numOfCategoryUses: Record<string, number | undefined>
): keyof TQuizCategory => {
    console.log("Before - numOfCategoryUses: ", numOfCategoryUses);

    const minCategoryUses = Math.min(...categoryUses);
    const minCategoryUsesKeys = categoryKeys.filter(categoryKey => numOfCategoryUses[categoryKey] === minCategoryUses);
    const minCategoryUsesKey = minCategoryUsesKeys[Math.floor(Math.random() * minCategoryUsesKeys.length)] as keyof TQuizCategory;

    console.log("minCategoryUsesKey: ", minCategoryUsesKey);

    numOfCategoryUses[minCategoryUsesKey] = numOfCategoryUses[minCategoryUsesKey] ? numOfCategoryUses[minCategoryUsesKey]! + 1 : 1;

    console.log("After - numOfCategoryUses: ", numOfCategoryUses);

    return minCategoryUsesKey;
}

const createQuizAnswers = async (
    quizQuestion: string,
    languageCode: string,
    category: keyof TQuizCategory
) => {
    //const quizAnswers = await fetchTranslations(quizQuestion, languageCode);
    const quizAnswers = [
        "¿Puedes mostrarme el camino al palacio?",
        "¿Qué es lo que te gusta de mí?",
        "¿Cuál es tu nombre?",
    ]

    if (!quizAnswers) return;

    const formattedQuizAnswers = formatQuizAnswersByCategory(quizAnswers, category);

    return formattedQuizAnswers;
}

const generateQuizData = async (words: string[], categories: TQuizCategory, languageCode: string) => {

    let quizData: TQuizData = {}

    const numOfCategoryUses: {
        [key in keyof TQuizCategory]: number | undefined
    } = {
        translation: categories.translation ? 0 : undefined,
        multiple_choice: categories.multiple_choice ? 0 : undefined,
        insert_missing: categories.insert_missing ? 0 : undefined,
    }

    const categoryKeys = Object.keys(numOfCategoryUses) as (keyof TQuizCategory)[];
    const categoryUses = Object.values(numOfCategoryUses);
    const filteredCategoryUses = categoryUses.filter(categoryUse => categoryUse !== undefined) as number[];

    words.forEach(async (word) => {
        const quizQuestion = await createQuizQuestion(word);
        const quizQuestionCategory = assignCategoryToQuizQuestion(categoryKeys, filteredCategoryUses, numOfCategoryUses);

        // create a quiz answer by translating the quiz question to the learning language
        let quizAnswers: string[] | undefined = undefined;
        if (quizQuestion) {
            quizAnswers = await createQuizAnswers(quizQuestion, languageCode, quizQuestionCategory);
        }


        quizData = {
            ...quizData,
            [word]: {
                quizQuestionCategory,
                quizQuestion,
                quizAnswers
            }
        }
    })

    return quizData;

}

export { fetchAllLanguages, generateQuizData }

