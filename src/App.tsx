import { Box, Button, ChakraProvider, Heading, Input, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NumberBox from './Components/NumberBox';
import NumberRow from './Components/NumberRow';
import { Guess } from './logic/interfaces';
import { generateNewNumber } from './logic/numbers';
import { getColor, initialState } from './logic/guesses';

function App() {
  const toast = useToast();
  const [number, setNumber] = useState<number[]>([1, 2, 3, 4, 5]);
  const [guesses, setGuesses] = useState<Guess[]>(initialState);
  const [currentRow, setCurrentRow] = useState<number>(1);
  const availableNumbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [numberRevealed, setNumberRevelaed] = useState<boolean>(false);

  const newGame = () => {
    const randomNumber = generateNewNumber();
    setNumber(randomNumber);
    setGuesses(initialState);
    setNumberRevelaed(false);
    setCurrentRow(1);
  };

  const checkIfGameEnds = () => {
    if (numberRevealed) {
      newGame();
      return;
    }
    if (guesses[currentRow - 1].number === number.join("")) {
      toast({
        title: `You guessed correctly!`,
        description: `The number was ${number.join("")}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    if (currentRow !== 6) {
      return;
    }
    toast({
      title: `You guessed incorrectly!`,
      description: `The number was ${number.join("")}`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    setNumberRevelaed(true);

  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <ChakraProvider>
      <Box display="flex" flexDirection="column" textAlign="center" justifyContent="center" color="white" gap={10} mt={5}>
        <Heading size="4xl">Numerle</Heading>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          {guesses.map((guess: Guess) => (
            <NumberRow guessedNumbers={guess.number} numberToGuess={number} key={guess.rowNumber} rowConfirmed={guess.rowConfirmed} />
          ))}
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="20%" margin="auto" gap={5}>
          <Input value={guesses.find((guess) => guess.rowNumber === currentRow)?.number} onChange={(e) => {
            if (isNaN(parseInt(e.target.value)) && e.target.value !== "") {
              return toast({
                title: "Invalid input",
                description: "Please enter a number",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
            setGuesses(guesses.map((guess) => {
              if (guess.rowNumber === currentRow) {
                return { ...guess, number: e.target.value };
              } else {
                return guess;
              }
            }
            ));
          }}
            placeholder="Enter your guess"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkIfGameEnds();
                if (guesses.find((guess) => guess.rowNumber === currentRow)?.number.length !== 5) return toast({
                  title: "Invalid input",
                  description: "Please enter 5 numbesrs",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                setGuesses(guesses.map((guess) => {
                  if (guess.rowNumber === currentRow) {
                    return { ...guess, rowConfirmed: true };
                  } else {
                    return guess;
                  }
                }));
                if (currentRow < 6) {
                  setCurrentRow(currentRow + 1);
                }
              }
            }}
          />
          <Button onClick={newGame}>New game</Button>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          {availableNumbers.map((availableNumber: number) => (
            <NumberBox number={availableNumber} size={75} key={availableNumber} backgroundColor={getColor(guesses, availableNumber)} /> 
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App
