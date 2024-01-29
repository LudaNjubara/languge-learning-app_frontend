
import { TLearningLanguage, TUserData } from "@/typings"
import { StateCreator } from "zustand"

export interface IGlobalStateSlice {
    currentUser: TUserData | null
    learningLanguage: TLearningLanguage | null
    setLearningLanguage: (language?: TLearningLanguage) => void
    setCurrentUser: (user: TUserData) => void
}

export const createGlobalStateSlice: StateCreator<
    IGlobalStateSlice,
    [],
    [],
    IGlobalStateSlice
> = (set) => ({
    currentUser: null,
    learningLanguage: null,
    setLearningLanguage: (learningLanguage?: TLearningLanguage) => set({ learningLanguage }),
    setCurrentUser: (user) => set({ currentUser: user }),
})