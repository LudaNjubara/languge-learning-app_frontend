import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SettingsStateSlice, createSettingsStateSlice } from "./slices/settingsSlice";

interface DashboardState extends SettingsStateSlice { }

export const useSettingsStore = create<DashboardState>()(
    devtools(
        (...a) => ({
            ...createSettingsStateSlice(...a),
        }),
    )
)