
const BACKEND_PORT = 8080;
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
const API_URL = `${BACKEND_URL}/api`;

const FREE_DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries";
const LEXICALA_API_URL = "https://lexicala1.p.rapidapi.com";

const lexicalaHeaders = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY!,
    'X-RapidAPI-Host': "lexicala1.p.rapidapi.com",
} as const

const ALLOWED_URLS = [
    "/login",
    "/register",
    "/",
];

const MAX_NUM_OF_TRIES_PER_QUESTION = 2;

export { ALLOWED_URLS, API_URL, FREE_DICTIONARY_API_URL, LEXICALA_API_URL, MAX_NUM_OF_TRIES_PER_QUESTION, lexicalaHeaders };

