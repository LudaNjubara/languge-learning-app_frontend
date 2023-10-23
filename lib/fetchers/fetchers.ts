import { TLearningLanguage } from "@/components/pages/settings";
import { TUserData } from "@/typings";
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

export { fetchSupportedLanguages, fetchUserData };

