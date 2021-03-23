import React from 'react';
import { ThemeProvider, theme } from 'react-native-design-system';
import Main from './src/Main';

export default function App() {
  const text = "You know nothing john snow";
  return (
    <ThemeProvider value={theme}>
      <Main text={text} />
    </ThemeProvider>
  );
}
