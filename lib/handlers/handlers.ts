"use server"

import { TQuizDataToSubmit } from "@/components/pages/quiz/TheQuiz"
import { TLoginFormData, TRegisterFormData } from "@/typings"
import { cookies } from "next/headers"
import { API_URL } from "../constants/consts"

const handleRegister = async (formData: TRegisterFormData) => {

    const response = await fetch(API_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })

    if (response.ok) {
        const data = await response.json()
        cookies().set("token", data.jwt)

        return data
    }
    else {
        throw new Error("Something went wrong")
    }
}

const handleLogin = async (formData: TLoginFormData) => {

    const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
        body: JSON.stringify(formData),
    })

    if (response.ok) {
        const data = await response.json()
        cookies().set("token", data.jwt)

        return data
    }
    else {
        throw new Error("Something went wrong")
    }
}

const handleLogout = async () => {
    cookies().delete("token");
}

const handleLanguageSettingChange = (formData: FormData, username?: string | null) => {
    if (!username) return;

    const languageCode = formData.get("languageCode") as string;


    fetch(`${API_URL}/user/update-selected-language`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`,
        },
        body: JSON.stringify({
            username,
            languageCode,
        }),
    }).catch((error) => {
        console.log(error);
    });
};

const handleSubmitFinishedQuiz = async (quizDataToSubmit: TQuizDataToSubmit[]) => {
    return fetch(`${API_URL}/quiz/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
        body: JSON.stringify({ quizSubmitRequests: quizDataToSubmit }),
    })
}

export type TCreateQuizFormData = {
    question: string;
    answers: string[];
    languageCode: string;
};

const handleCreateQuiz = async (formData: TCreateQuizFormData) => {
    return fetch(`${API_URL}/quiz/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`,
        },
        body: JSON.stringify(formData),
    })
}


export { handleCreateQuiz, handleLanguageSettingChange, handleLogin, handleLogout, handleRegister, handleSubmitFinishedQuiz }

