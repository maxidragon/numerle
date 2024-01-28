export const generateNewNumber = () => {
    const numbers: number[] = [];
    while (numbers.length < 5) {
        const randomNumber = Math.floor(Math.random() * 10);
        if (numbers.filter(number => number === randomNumber).length < 2) {
            numbers.push(randomNumber);
        }
    }
    return numbers;
};