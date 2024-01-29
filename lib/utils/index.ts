import mockLanguages from "@/mock/languages"
import { TLanguageApiResponse } from "@/typings"
import { LEXICALA_API_URL, lexicalaHeaders } from "../constants/consts"


const fetchAllLanguages = async (): Promise<TLanguageApiResponse> => {
    if (process.env.NODE_ENV === 'development') return mockLanguages

    const res = await fetch(`${LEXICALA_API_URL}/languages`, {
        method: 'GET',
        headers: lexicalaHeaders,
    })

    if (!res.ok) throw new Error(res.statusText)


    return res.json()
}

export { fetchAllLanguages }

