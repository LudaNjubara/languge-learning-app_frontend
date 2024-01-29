import { TLearningLanguage } from "./components/pages/settings";

type TAuthority = "ROLE_USER" | "ROLE_ADMIN";

type TUserData = {
    username?: string;
    authorities: TAuthority[];
    selectedLanguage?: TLearningLanguage;
    takenQuizzes: TQuizData[];
}

type TLearningLanguage = {
    languageCode: string;
    languageName: string;
};

type TRegisterFormData = {
    username: string;
    password: string;
};

type TLoginFormData = {
    username: string;
    password: string;
};

type TLanguageApiResponse = {
    language_names: {
        [key: string]: string;
    };
    resources: {
        global: {
            source_languages: string[];
            target_languages: string[];
        },
        password: {
            source_languages: string[];
            target_languages: string[];
        },
        random: {
            source_languages: string[];
            target_languages: string[];
        },
    }
};

type TLanguage = {
    name: string;
    code: string;
}

// Dictionary API
type TDictionaryWordSenseExample = {
    text: string
    translations: TDictionaryWordSenseTranslation[]
}

type TDictionaryWordSenseTranslation = {
    [key: string]: {
        text: string
        gender: string
    }
}

type TDictionaryWordSense = {
    id: string
    definition?: string
    semantic_category: string
    translations: TDictionaryWordSenseTranslation[]
    examples?: TDictionaryWordSenseExample[]
    compositional_phrases?: {
        text: string
        definition: string
        translations: TDictionaryWordSenseTranslation[]
        examples: TDictionaryWordSenseExample[]
    }[]
}

type TDictionaryWord = {
    id: string
    source: string
    language: string
    version: number
    frequency: string
    headword: {
        text: string
        pronunciation: {
            value: string
        }
        pos: string
        gender: string
    }
    senses: TDictionaryWordSense[]
}

type TDictionaryApiResponse = {
    n_results: number;
    page_number: number
    results_per_page: number
    n_pages: number
    available_n_pages: number
    results: TDictionaryWord[]
};

// Quiz
type TQuizCategory = {
    translation: boolean;
    multiple_choice: boolean;
    insert_missing: boolean;
};

type TQuizAnswer = {
    id: number;
    answer: string;
};

type TQuizData = {
    id: number;
    language: TLearningLanguage;
    question: string;
    answers: TQuizAnswer[];
    createdByUsername: string;
    userAnswer?: string;
};

export { TAuthority, TDictionaryApiResponse, TDictionaryWord, TLanguage, TLanguageApiResponse, TLearningLanguage, TLoginFormData, TQuizAnswer, TQuizCategory, TQuizData, TRegisterFormData, TUserData };

