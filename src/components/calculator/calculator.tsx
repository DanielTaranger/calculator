import { useEffect, useState } from 'react';
import './calculator.css';
import { compile, evaluate } from 'mathjs';
import Upgrades from './upgrades/upgrades';
import { Costs } from '../../types';

function Calculator() {
  const costs: Costs = { tickRateCost: 80, numberCost: 100 }
  const operators = ["+", "-", "*", "/"];
  const [input, setInput] = useState('');
  const [tickRate, setTickRate] = useState(1000);
  const [total, setTotal] = useState(0);

  const isValidInput = (e: string) => {
    try {
      const valid = compile(e);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const handleButtonClick = (buttonText: string | number) => {
    if (buttonText === '=') {
      if (isValidInput(input) && operators.some(char => input.includes(char))) { //if input is compilable and contains any of the operators
        setTotal(total + evaluate(input));
        setInput('');
      }
    } else if (buttonText === '<') {
      setInput(input.slice(0, -1));
    } else if (buttonText === 'CE') {
      setInput('');
    } else {
      setInput(input + buttonText);
    }
  };

  const updateTickRate = () => {
    setTickRate(tickRate * 0.9);
    setTotal(total - costs.tickRateCost);
  }

  const updateGameState = () => {
    setTotal(total + 1);
  }

  useEffect(() => {
    const intervalId = setInterval(updateGameState, tickRate);
    return () => clearInterval(intervalId);
  }, [total]);

  return (
    <div className="row calculatorContainer">
      <Upgrades costs={costs} total={total} upgradeTickrate={updateTickRate} />
      <div className="calculator">
        <div className="total">{total}</div>
        <div className="input">{input}</div>
        <div className="row">
          <div className="column">
            <div className="row">
              <button disabled={false} onClick={() => handleButtonClick(7)}>7</button>
              <button disabled={false} onClick={() => handleButtonClick(8)}>8</button>
              <button disabled={false} onClick={() => handleButtonClick(9)}>9</button>
            </div>
            <div className="row">
              <button disabled={false} onClick={() => handleButtonClick(4)}>4</button>
              <button disabled={false} onClick={() => handleButtonClick(5)}>5</button>
              <button disabled={false} onClick={() => handleButtonClick(6)}>6</button>
            </div>
            <div className="row">
              <button disabled={false} onClick={() => handleButtonClick(1)}>1</button>
              <button disabled={false} onClick={() => handleButtonClick(2)}>2</button>
              <button disabled={false} onClick={() => handleButtonClick(3)}>3</button>
            </div>
            <div className="row">
              <button disabled={false} onClick={() => handleButtonClick(0)}>0</button>
              <button disabled={false} onClick={() => handleButtonClick('.')}>.</button>
              <button disabled={false} onClick={() => handleButtonClick('CE')}>CE</button>
            </div>
          </div>
          <div className="column">
            <button disabled={false} onClick={() => handleButtonClick('<')}>{'<'}</button>
            <button disabled={true} onClick={() => handleButtonClick('*')}> *</button>
            <button disabled={false} onClick={() => handleButtonClick('+')}>+</button>
            <button disabled={false} onClick={() => handleButtonClick('=')}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;