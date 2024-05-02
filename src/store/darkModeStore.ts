import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  mousePos: {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
  } | null;
  setMousePos: (
    mousePos: {
      clientX: number;
      clientY: number;
      pageX: number;
      pageY: number;
    } | null
  ) => void;
}

const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false,
  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
  mousePos: null,
  setMousePos: (mousePos) => set({ mousePos }),
}));

export default useDarkModeStore;
