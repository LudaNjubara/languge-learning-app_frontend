import { TDictionaryApiResponse, TGoogleTranlateTranslation, TGoogleTranslateApiResponse } from "@/typings";
import { GOOGLE_TRANSLATE_API_URL, LEXICALA_API_URL, RANDOM_WORD_API_URL, googleTranslateHeaders, lexicalaHeaders } from "../constants/consts";

const fetchRandomWords = async (amount: number): Promise<string[]> => {
    let wordsToReturn: string[] = [];

    const urlSearchParams = new URLSearchParams({
        number: amount.toString(),
    });

    const res = await fetch(`${RANDOM_WORD_API_URL}?${urlSearchParams.toString()}`);

    if (!res.ok) throw new Error("Something went wrong while fetching the random words.");

    const wordsArray = (await res.json()) as string[];
    wordsArray.forEach((word: string) => wordsToReturn.push(word));

    return wordsToReturn;
};

const fetchTranslations = async (querySentence: string, targetLanguage: string, sourceLanguage: string = "en"): Promise<string[]> => {
    const urlSearchParams = new URLSearchParams({
        // encode the query sentence as a url parameter
        q: encodeURIComponent(querySentence),
        target: targetLanguage,
        source: sourceLanguage
    });

    const res = await fetch(GOOGLE_TRANSLATE_API_URL, {
        method: "POST",
        headers: googleTranslateHeaders,
        body: urlSearchParams.toString()
    });

    if (!res.ok) throw new Error("Failed to fetch the translation");

    const { data } = await res.json() as TGoogleTranslateApiResponse;

    const translations: string[] = [...data.translations.map((translation: TGoogleTranlateTranslation) => decodeURIComponent(translation.translatedText))];

    return translations;
}

const fetchDictionaryData = async (word: string) => {
    const urlSearchParams = new URLSearchParams({
        text: "burn",
        language: "en",
    });

    const res = await fetch(`${LEXICALA_API_URL}/search-entries?${urlSearchParams.toString()}`, {
        method: "GET",
        headers: lexicalaHeaders
    });

    if (!res.ok) throw new Error("Failed to fetch the dictionary data");

    const { results } = await res.json() as TDictionaryApiResponse;

    return results;
};

export { fetchDictionaryData, fetchRandomWords, fetchTranslations };

