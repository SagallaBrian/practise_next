// Import ThemeProvider from Material-UI  to apply themes.
// Import useMediaQuery from Material-UI checks the user's system preferences.
import { ThemeProvider, useMediaQuery } from "@mui/material";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { darkTheme, lightTheme } from "./theme";

export interface ThemeInterface {
  mode: "light" | "dark";
  toggleMode: () => void;
}

const defaultThemeProvider: ThemeInterface = {
  mode: "light",
  toggleMode: () => {},
};

const ThemeContext = createContext(defaultThemeProvider);

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const toggleMode = () => {
    setMode((prevMode) => {
      const currMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", currMode);
      return currMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setMode(savedTheme);
    } else {
      setMode(prefersDarkMode ? "dark" : "light");
    }
  }, []);

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useCustomTheme = () => useContext(ThemeContext);

export default ThemeContextProvider;
