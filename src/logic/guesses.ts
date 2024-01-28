import { Guess } from "./interfaces";

export const initialState = [
  { rowNumber: 1, number: "", rowConfirmed: false },
  { rowNumber: 2, number: "", rowConfirmed: false },
  { rowNumber: 3, number: "", rowConfirmed: false },
  { rowNumber: 4, number: "", rowConfirmed: false },
  { rowNumber: 5, number: "", rowConfirmed: false },
  { rowNumber: 6, number: "", rowConfirmed: false },
];

export const getColor = (guesses: Guess[], number: number) => {
  let color = "#4A5568";
  guesses.forEach((guess: Guess) => {
    console.log(guess.number.includes(number.toString()));
    if (guess.number.includes(number.toString())) {
      color = "#171923";
    }
  });
  return color;
};
