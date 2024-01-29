import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IGlobalStateSlice, createGlobalStateSlice } from "./slices/settingsSlice";

interface DashboardState extends IGlobalStateSlice { }

export const useGlobalStore = create<DashboardState>()(
    devtools(
        (...a) => ({
            ...createGlobalStateSlice(...a),
        }),
    )
)