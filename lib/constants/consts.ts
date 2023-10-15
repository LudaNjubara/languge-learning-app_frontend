
const BACKEND_PORT = 8080;
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
const API_URL = `${BACKEND_URL}/api`;

const GOOGLE_TRANSLATE_API_URL = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const FREE_DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries";
const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word";
const LEXICALA_API_URL = "https://lexicala1.p.rapidapi.com";

const googleTranslateHeaders = {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': "google-translate1.p.rapidapi.com"
}

const lexicalaHeaders = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY!,
    'X-RapidAPI-Host': "lexicala1.p.rapidapi.com",
    'Accept-Encoding': 'application/json'
} as const

export { API_URL, FREE_DICTIONARY_API_URL, GOOGLE_TRANSLATE_API_URL, LEXICALA_API_URL, RANDOM_WORD_API_URL, googleTranslateHeaders, lexicalaHeaders };

