import React, { useState } from 'react'
import { Stack, Card, Button, Text, Box, Header } from 'react-native-design-system';
import { ScrollView } from 'react-native'

function generateRandomString (text) {
    const array = text.split(' ');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  return array;
}

export default function Main({ text }) {
    const [question, setQuestion] = useState(generateRandomString(text));
    const [answer, setAnswer] = useState([]);
    const [result, setResult] = useState(null)

    const selectWord = (word) => {
        const newQuestionArray = question.filter(item => item !== word);
        const newAnswerArray = [...answer, word];
        setQuestion(newQuestionArray);
        setAnswer(newAnswerArray);
        resetResult();
    }

    const unselectWord = (word) => {
        const newAnswerArray = answer.filter(item => item !== word);
        const newQuestionArray = [...question, word];
        setAnswer(newAnswerArray);
        setQuestion(newQuestionArray);
        resetResult();
    }

    const checkResult = () => {
        if (answer.join(' ') === text){
            setResult(true);
        } else {
            setResult(false);
        }
    }

    const resetResult = () => {
        setResult(null);
    }
    
    return (
        <ScrollView>
            <Header>Game Time</Header>
            <Stack style={{ margin: 10, backgroundColor: '#fefefe'}}>
                <Card shadow>
                    <Box>
                        <Text size="xlarge">Arrange the words to form a sentence</Text>
                    </Box>
                    <Card outline>
                        <Stack direction="horizontal" accessibilityLabel="questions" verticalSpace="xsmall" cropEndSpace>
                            {question.length > 0
                                ? question.map((item, index) => (
                                    <Button key={index} outline round onPress={() => selectWord(item)}>{item}</Button>
                                ))
                                : <Text>Click submit to check result</Text>
                            }
                        </Stack>
                    </Card>
                </Card>
                <Card shadow>
                    <Box>
                        <Text size="xlarge">Arranged words</Text>
                    </Box>
                    <Card outline>
                        <Stack direction="horizontal" accessibilityLabel="answers" verticalSpace="xsmall" cropEndSpace>
                            {answer.length > 0
                                ? answer.map((item, index) => (
                                    <Button key={index} outline round onPress={() => unselectWord(item)}>{item}</Button>
                                ))
                                : <Text>Select some words to show here</Text>
                            }
                        </Stack>
                    </Card>
                </Card>
                {result !== null
                    ? (
                        <Box space="xsmall">
                            <Text size="large" style={{ color: result ? 'green' : 'red'}}>
                                {result ? 'Correct answer 🥳' : 'Wrong answer 😢'}
                            </Text>
                        </Box> 
                    )
                    : null
                }
            </Stack>
            <Card space="xsmall">
                <Button onPress={checkResult}>Submit</Button>
            </Card>
        </ScrollView>
    );
}
