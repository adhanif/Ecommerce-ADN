import React, { ReactNode, useContext, createContext } from 'react';

type Mode = 'dark' | 'light';

type ThemeContextType = {
  mode: Mode;
  toggleColorMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = React.useState<Mode>('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

// const colorMode = React.useContext(ColorModeContext);
