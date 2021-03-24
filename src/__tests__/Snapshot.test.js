import React from 'react';
import { create } from 'react-test-renderer';
import Main from '../Main';
import { ThemeProvider, theme } from 'react-native-design-system';

const useTheme = (children) => {
    return (
        <ThemeProvider value={theme}>
            {children}
        </ThemeProvider>
    );
}

const tree = create(useTheme(<Main text="One" />));

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
});