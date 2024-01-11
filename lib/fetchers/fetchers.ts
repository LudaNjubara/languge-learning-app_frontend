"use server"

import { TLearningLanguage } from "@/components/pages/settings";
import { TQuizData, TUserData } from "@/typings";
import { cookies } from "next/headers";
import { API_URL } from "../constants/consts";

const fetchUserData = async () => {
    const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
    });

    if (!response.ok) throw new Error("Failed to fetch the user data");

    const data = await response.json();

    return data as TUserData;
};

const fetchSupportedLanguages = async () => {
    const response = await fetch(`${API_URL}/supported-languages/all`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
    });

    if (!response.ok) throw new Error("Failed to fetch the supported languages");

    const data = await response.json();

    return data as TLearningLanguage[];
}

const fetchUserQuizHistory = async () => {
    const response = await fetch(`${API_URL}/user/quiz-history`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
    });

    if (!response.ok) throw new Error("Failed to fetch the user's quiz history");

    const data = await response.json();

    return data as string[]; // TODO: replace with TQuizHistory or something
}

const fetchQuizData = async (languageCode: string, numOfQuestions: number = 1): Promise<TQuizData[]> => {
    const searchParams = new URLSearchParams({
        languageCode,
        numOfQuestions: numOfQuestions.toString()
    })

    const res = await fetch(`${API_URL}/quiz/fetch?${searchParams}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get("token")?.value}`,
        }
    })

    if (!res.ok) throw new Error(res.statusText)

    return res.json()
}

export { fetchQuizData, fetchSupportedLanguages, fetchUserData, fetchUserQuizHistory };

