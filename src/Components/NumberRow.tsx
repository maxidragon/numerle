import { Box } from "@chakra-ui/react";
import NumberBox from "./NumberBox";

interface NumberRowProps {
    guessedNumbers: string;
    numberToGuess: number[];
    rowConfirmed?: boolean;
}

const NumberRow: React.FC<NumberRowProps> = ({ guessedNumbers, numberToGuess, rowConfirmed }): JSX.Element => {
    const numbers: number[] = guessedNumbers.split("").map((number: string) => parseInt(number));
    const message = () => {
        if (!rowConfirmed) return "";
        if (guessedNumbers === numberToGuess.join("")) {
            return "Equals";
        } else if (+guessedNumbers > +numberToGuess.join("")) {
            return "Too high";
        } else {
            return "Too low";
        }
    }
    const color = (number: number, position: number) => {
        if (!rowConfirmed) return "#4A5568";
        if (number === numberToGuess[position]) {
            return "#68D391";
        } else if (numberToGuess.includes(number) && numberToGuess[position] !== number) {
            return "#ECC94B";
        } else {
            return "#4A5568";
        }
    };

    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <NumberBox number={numbers[0]} size={75} backgroundColor={color(numbers[0], 0)} key={1} />
            <NumberBox number={numbers[1]} size={75} backgroundColor={color(numbers[1], 1)} key={2} />
            <NumberBox number={numbers[2]} size={75} backgroundColor={color(numbers[2], 2)} key={3} />
            <NumberBox number={numbers[3]} size={75} backgroundColor={color(numbers[3], 3)} key={4} />
            <NumberBox number={numbers[4]} size={75} backgroundColor={color(numbers[4], 4)} key={5} />
            <Box width={75} height={75} backgroundColor="#4A5568" borderRadius="20%" fontSize={25} justifyContent="center" alignItems="center" display="flex" margin={2}>
                {message()}
            </Box>
        </Box>
    )
};

export default NumberRow;
