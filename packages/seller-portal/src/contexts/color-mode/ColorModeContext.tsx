import React from 'react';

type ColorMode = 'light' | 'dark';

type ColorModeContextValue = {
  colorMode: ColorMode;
  onColorModeChange: (colorMode: ColorMode) => void;
};

const INITIAL_STATE: ColorModeContextValue = {
  colorMode: 'light',
  onColorModeChange: () => {},
};

export const ColorModeContext =
  React.createContext<ColorModeContextValue>(INITIAL_STATE);

export const useColorMode = () => React.useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{
  initialColorMode?: ColorMode;
}> = (props) => {
  const { children, initialColorMode = 'light' } = props;

  const [colorMode, setColorMode] = React.useState(initialColorMode);

  const value = {
    colorMode,
    onColorModeChange: (newColorMode: ColorMode) => setColorMode(newColorMode),
  };

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext;
