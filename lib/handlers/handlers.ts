"use server"

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

const handleLogout = () => { }

const handleLanguageSettingChange = (formData: FormData) => {
    const languageCode = formData.get("languageCode") as string;


    fetch(`${API_URL}/user/update-selected-language`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`,
        },
        body: JSON.stringify({
            username: "someone1",
            languageCode,
        }),
    }).catch((error) => {
        console.log(error);
    });
};

const fetchUserQuizHistory = async () => {
    const response = await fetch(`${API_URL}/user/quiz-history`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
    });

    if (!response.ok) throw new Error("Failed to fetch the user's quiz history");

    const data = await response.json();

    return data as string[]; // // TODO: replace with TQuizHistory or something
}


export { fetchUserQuizHistory, handleLanguageSettingChange, handleLogin, handleLogout, handleRegister }

