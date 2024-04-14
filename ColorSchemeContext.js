import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from './globalStyles';

const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({ children }) => {
  const deviceColorScheme = Appearance.getColorScheme();
  const [colorScheme, setColorScheme] = useState(deviceColorScheme);
  
  const currentStyles = colorScheme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => listener.remove();
  }, []);

  return (
    <ColorSchemeContext.Provider value={{stylesGlobal: currentStyles }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
export const useColorSchemeContext = () => {
  return useContext(ColorSchemeContext);
};
