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

export { handleLogin, handleLogout, handleRegister }

