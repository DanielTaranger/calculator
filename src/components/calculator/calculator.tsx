import { useEffect, useState } from 'react';
import './calculator.css';
import { evaluate, round } from 'mathjs';
import Upgrades from './upgrades/upgrades';
import Automation from './automation/automation';
import { Costs, maxDigitInput } from '../../types';
import { isValidInput, amountOfNumbers, visibleButton, buttons } from '../calculator/utils';

function Calculator() {
  const costs: Costs = { tickRateCost: 1, maxDigitCost: 1, maxInputCost: 1, buttonCost: 1 };
  const maxDigitInput: maxDigitInput = { maxDigit: 1, maxInput: 2 };

  const [total, setTotal] = useState(0);
  const [input, setInput] = useState('');
  const [tickRate, setTickRate] = useState(1000);
  const [tickRateCost, setTickRateCost] = useState(costs.tickRateCost);
  const [maxDigit, setMaxDigit] = useState(maxDigitInput.maxDigit);
  const [maxDigitCost, setMaxDigitCost] = useState(costs.maxDigitCost);
  const [maxInput, setMaxInput] = useState(maxDigitInput.maxInput);
  const [maxInputCost, setMaxInputCost] = useState(costs.maxInputCost);
  const [buttonCost, setButtonCost] = useState(costs.buttonCost);


  const handleButtonClick = (buttonText: string | number) => {
    if (buttonText === '=') {
      if (isValidInput(input)) { //if input is compilable and contains any of the operators
        setTotal(total + evaluate(input));
        setInput('');
      }
    } else if (buttonText === '<') {
      setInput(input.slice(0, -1));
    } else if (buttonText === 'CE') {
      setInput('');
    } else if (maxInput > input.length && maxDigit > amountOfNumbers(input)) {
      setInput(input + buttonText);
    }
  };

  const updateTickRate = () => {
    setTickRate(tickRate * 0.9);
    setTotal(total - tickRateCost);
    setTickRateCost(tickRateCost * 2);
    console.log(tickRateCost);
  }

  const updateMaxDigit = () => {
    setMaxDigit(maxDigit + 1);
    setTotal(total - maxDigitCost);
    setMaxDigitCost(maxDigitCost * 2);
  }

  const updateMaxInput = () => {
    setMaxInput(maxInput + 1);
    setTotal(total - maxInputCost);
    setMaxInputCost(maxInputCost * 2);
  }

  const updateButton = () => {
    setTotal(total - buttonCost);
    setButtonCost(buttonCost * 2);
    buttons.shift();

  }

  const updateGameState = () => {
    setTotal(total + 1);
  }
  /*
  useEffect(() => {
    const intervalId = setInterval(updateGameState, tickRate);
    return () => clearInterval(intervalId);
  }, [total]);*/

  return (
    <div className="row calculatorContainer">
      <Upgrades buttonCost={buttonCost} maxInputCost={maxInputCost}
        maxDigitCost={maxDigitCost} tickRateCost={tickRateCost}
        maxInput={maxInput} maxDigit={maxDigit} tickRate={tickRate}
        costs={costs} total={total} maxDigitInput={maxDigitInput}
        upgradeTickrate={updateTickRate} upgradeMaxDigit={updateMaxDigit}
        upgradeMaxInput={updateMaxInput} upgradeButton={updateButton} />
      <div className="calculator">
        <div className="total">{round(total, 2)}</div>
        <div className="input">{input}</div>
        <div className="row">
          <div className="column">
            <div className="row">
              <button disabled={visibleButton(7)} onClick={() => handleButtonClick(7)}>7</button>
              <button disabled={visibleButton(8)} onClick={() => handleButtonClick(8)}>8</button>
              <button disabled={visibleButton(9)} onClick={() => handleButtonClick(9)}>9</button>
            </div>
            <div className="row">
              <button disabled={visibleButton(4)} onClick={() => handleButtonClick(4)}>4</button>
              <button disabled={visibleButton(5)} onClick={() => handleButtonClick(5)}>5</button>
              <button disabled={visibleButton(6)} onClick={() => handleButtonClick(6)}>6</button>
            </div>
            <div className="row">
              <button disabled={visibleButton(1)} onClick={() => handleButtonClick(1)}>1</button>
              <button disabled={visibleButton(2)} onClick={() => handleButtonClick(2)}>2</button>
              <button disabled={visibleButton(3)} onClick={() => handleButtonClick(3)}>3</button>
            </div>
            <div className="row">
              <button disabled={visibleButton(0)} onClick={() => handleButtonClick(0)}>0</button>
              <button disabled={visibleButton('.')} onClick={() => handleButtonClick('.')}>.</button>
              <button disabled={visibleButton('CE')} onClick={() => handleButtonClick('CE')}>CE</button>
            </div>
          </div>
          <div className="column">
            <button disabled={visibleButton('<')} onClick={() => handleButtonClick('<')}>{'<'}</button>
            <button disabled={visibleButton('*')} onClick={() => handleButtonClick('*')}> *</button>
            <button disabled={visibleButton('+')} onClick={() => handleButtonClick('+')}>+</button>
            <button disabled={visibleButton('=')} onClick={() => handleButtonClick('=')}>=</button>
          </div>
        </div>
      </div>
      <Automation />
    </div>
  );
}

export default Calculator;