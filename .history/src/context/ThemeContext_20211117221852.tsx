import React, { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from 'react';

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious(theme: string) {
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = theme
  })
  return ref.current;
};

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
function useStorageTheme(key: string): [string, React.Dispatch<React.SetStateAction<string | boolean>>]{
  const userPreference =
    !!window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  const [theme, setTheme] = useState(
    // use stored theme; fallback to user preference
    localStorage.getItem(key) || userPreference
  );

  // update stored theme
  useEffect(() => {
    localStorage.setItem(key.toString(), theme.toString())
  }, [theme, key]);

  return [theme.toString(), setTheme];
};

interface IThemeContext{
  theme: string | React.Dispatch<React.SetStateAction<string | boolean>>
  toggleTheme: () => void
};

// create context
export const ThemeContext = React.createContext<IThemeContext>({ theme: "light", toggleTheme: () => {} });

interface IThemeProvider{
  children: React.ReactNode
};

// create context provider
export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [theme, setTheme] = useStorageTheme('theme');

  // update root element class on theme change
  const oldTheme = usePrevious(theme.toString());
  useLayoutEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`)
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme, oldTheme]);

  const  toggleTheme = useCallback(() => {

    if (theme === 'light'){
      setTheme('dark');
    }
    else{
      setTheme('light');
    };
  },[setTheme, theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}