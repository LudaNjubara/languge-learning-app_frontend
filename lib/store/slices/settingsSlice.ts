import { TLearningLanguage } from "@/components/pages/settings"
import { StateCreator } from "zustand"

export interface SettingsStateSlice {
    username: string | null
    learningLanguage: TLearningLanguage | null
    setLearningLanguage: (language?: TLearningLanguage) => void
    setUsername: (username?: string) => void
}

export const createSettingsStateSlice: StateCreator<
    SettingsStateSlice,
    [],
    [],
    SettingsStateSlice
> = (set) => ({
    username: null,
    learningLanguage: null,
    setLearningLanguage: (learningLanguage?: TLearningLanguage) => set({ learningLanguage }),
    setUsername: (username?: string) => set({ username }),
})