import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
    }),
    { name: "ui-store" }
  )
);
