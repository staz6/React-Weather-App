import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

type ThemeContextType = {
  Darktheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [Darktheme, setDarkTheme] = useState<boolean>(false);
  const contextvalue = useMemo(
    () => ({ Darktheme, setDarkTheme }),
    [Darktheme],
  );
  return (
    <ThemeContext.Provider value={contextvalue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider",
    );
  }
  return context;
};

export default ThemeContextProvider;
