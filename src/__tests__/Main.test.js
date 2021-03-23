import React from 'react';
import { render, fireEvent, within, cleanup } from '@testing-library/react-native';
import Main from '../Main';
import { ThemeProvider, theme } from 'react-native-design-system';

const useTheme = (children) => {
    return (
        <ThemeProvider value={theme}>
            {children}
        </ThemeProvider>
    );
}
afterEach(cleanup);

test('Should render words as buttons', () => {
    const { getByA11yLabel } = render(useTheme(<Main text="One Two Three Four Five" />));
    const questions = getByA11yLabel('questions');
    const oneButton = within(questions).getByText('One');
    expect(oneButton).toBeDefined();
});

test('Should be able to select word', () => {
    const { getByText, getByA11yLabel } = render(useTheme(<Main text="One Two Three Four Five" />));
    const button = getByText('One');
    fireEvent.press(button);
    const answers = getByA11yLabel('answers');
    const selectedButton = within(answers).getByText('One');
    expect(selectedButton).toBeDefined();
});

test('Should be able to uselect word', () => {
    const { getByText, getByA11yLabel } = render(useTheme(<Main text="One Two Three Four Five" />));
    const button = getByText('One');
    //select word
    fireEvent.press(button);
    const answers = getByA11yLabel('answers');
    const selectedButton = within(answers).getByText('One');
    expect(selectedButton).toBeDefined();
    //unselect word
    fireEvent.press(selectedButton);
    const questions = getByA11yLabel('questions');
    const unselectedButton = within(questions).getByText('One');
    expect(unselectedButton).toBeDefined();
});

test('Should show error when wrong answer is submitted', () => {
    const { getByText } = render(useTheme(<Main text="One Two Three Four Five" />));
    const button = getByText('One');
    fireEvent.press(button);
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);
    const failureMessage = getByText('Wrong answer 😢');
    expect(failureMessage).toBeDefined();
});

test('Should clear error message when button is clicked', () => {
    //check if error appears
    const { getByText } = render(useTheme(<Main text="One Two Three Four Five" />));
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);
    const failureMessage = getByText('Wrong answer 😢');
    expect(failureMessage).toBeDefined();
    //check if error message dissapears
    const button = getByText('One');
    fireEvent.press(button);
    expect(() => getByText('Wrong answer 😢')).toThrow("Unable to find an element with text: Wrong answer 😢");
});

test('Should show win message when correct answer is submitted', () => {
    const { getByText } = render(useTheme(<Main text="One Two Three Four Five" />));

    const buttonOne = getByText('One');
    fireEvent.press(buttonOne);

    const buttonTwo = getByText('Two');
    fireEvent.press(buttonTwo);

    const buttonThree = getByText('Three');
    fireEvent.press(buttonThree);

    const buttonFour = getByText('Four');
    fireEvent.press(buttonFour);

    const buttonFive = getByText('Five');
    fireEvent.press(buttonFive);

    // check result
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);
    
    const successMessage = getByText('Correct answer 🥳');
    expect(successMessage).toBeDefined();
});