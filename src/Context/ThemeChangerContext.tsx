import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

type ThemeContextType = {
  Darktheme: boolean;
  toggleDarkTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [Darktheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (Darktheme) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }, [Darktheme]);

  const toggleDarkTheme = (): void => {
    setDarkTheme((prev) => !prev);
  };

  const contextValue: ThemeContextType = useMemo(
    () => ({ Darktheme, toggleDarkTheme }),
    [Darktheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
