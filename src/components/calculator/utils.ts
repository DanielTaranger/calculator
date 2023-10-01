import { compile } from 'mathjs';

const operators = ["+", "-", "*", "/"];
export const buttons = [2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '*'];
const numbers = "123456789";

export const isValidInput = (input: string) => {
    if (operators.some(char => input.includes(char))) {
        try {
            compile(input);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

export const amountOfNumbers = (input: string) => {
    let amount = 0;
    for (let i = 0; i < input.length; i++) {
        if (numbers.includes(input[i])) {
            amount += 1;
        }
    }
    return amount;
}


export function visibleButton(input: number | string) {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] === input) {
            return true;
        }
    }
    return false;
}
