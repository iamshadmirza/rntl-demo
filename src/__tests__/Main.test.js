import React from 'react';
import { render, fireEvent, within } from '@testing-library/react-native';
import Main from '../Main';
import { ThemeProvider, theme } from 'react-native-design-system';

const ThemeWrapper = (children) => {
    return (
        <ThemeProvider value={theme}>
            {children}
        </ThemeProvider>
    );
}

test('Should render passed text as words', () => {
    const { getByA11yLabel } = render(ThemeWrapper(<Main text="One Two Three Four Five" />));
    const questions = getByA11yLabel('questions');
    const oneButton = within(questions).getByText('One');
    expect(oneButton).toBeDefined();
});

test('Should be able to select word', () => {
    const { getByText, getByA11yLabel } = render(ThemeWrapper(<Main text="One Two Three Four Five" />));
    const button = getByText('One');
    fireEvent.press(button);
    const answers = getByA11yLabel('answers');
    const selectedButton = within(answers).getByText('One');
    expect(selectedButton).toBeDefined();
});

test('Should be able to unselect word', () => {
    const { getByText, getByA11yLabel } = render(ThemeWrapper(<Main text="One Two Three Four Five" />));
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
    const { getByText } = render(ThemeWrapper(<Main text="One Two Three Four Five" />));
    const button = getByText('One');
    fireEvent.press(button);
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);
    const failureMessage = getByText('Wrong answer 😢');
    expect(failureMessage).toBeDefined();
});

test('Should clear error message when button is clicked again', () => {
    //check if error appears
    const { getByText, queryByText } = render(ThemeWrapper(<Main text="One Two Three Four Five" />));
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);
    const failureMessage = getByText('Wrong answer 😢');
    expect(failureMessage).toBeDefined();
    //check if error message dissapears
    const button = getByText('One');
    fireEvent.press(button);
    expect(queryByText('Wrong answer 😢')).toBeNull();
});

test('Should show win message when correct answer is submitted', () => {
    const { getByText } = render(ThemeWrapper(<Main text="One Two Three Four Five" />));

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