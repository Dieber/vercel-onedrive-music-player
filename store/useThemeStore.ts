import create, { SetState } from "zustand";
import { ThemeMap } from "../constant";

export type Theme = keyof typeof ThemeMap;

type ThemeStore = {
  theme: Theme;
  setTheme: (themeName: Theme) => void;
};

const useThemeStore = create<ThemeStore>((set) => ({
  theme: "spring",
  setTheme: (themeName: Theme) => {
    set({
      theme: themeName,
    });
  },
}));

export default useThemeStore;
