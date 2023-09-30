import React, { useState } from 'react';
import './calculator.css';

function Calculator() {
  // State to store the input text
  const [inputText, setInputText] = useState('');

  // Function to handle button clicks
  const handleButtonClick = (buttonText: string | number) => {
    if (buttonText === '=') {
      // Handle the calculation when '=' is clicked (you can implement this logic)
      // For now, we'll just display the input text as is.
      // Replace this with your actual calculation logic.
      setInputText(inputText);
    } else if (buttonText === '<') {
      // Handle backspace button click by removing the last character
      setInputText(inputText.slice(0, -1));
    } else if (buttonText === 'CE') {
      // Reset input text
      setInputText('');
    } else {
      // Append the clicked button's text to the input
      setInputText(inputText + buttonText);
    }
  };

  return (
    <div className="calculator">
      <div className="numbers">{inputText}</div>
      <div className="input">{inputText}</div>
      <div className="row">
        <div className="column">
          <div className="row">
            <button disabled={false} onClick={() => handleButtonClick('7')}>7</button>
            <button disabled={false} onClick={() => handleButtonClick('8')}>8</button>
            <button disabled={false} onClick={() => handleButtonClick('9')}>9</button>
          </div>
          <div className="row">
            <button disabled={false} onClick={() => handleButtonClick('4')}>4</button>
            <button disabled={false} onClick={() => handleButtonClick('5')}>5</button>
            <button disabled={false} onClick={() => handleButtonClick('6')}>6</button>
          </div>
          <div className="row">
            <button disabled={false} onClick={() => handleButtonClick('1')}>1</button>
            <button disabled={false} onClick={() => handleButtonClick('2')}>2</button>
            <button disabled={false} onClick={() => handleButtonClick('3')}>3</button>
          </div>
          <div className="row">
            <button disabled={false} onClick={() => handleButtonClick('0')}>0</button>
            <button disabled={false} onClick={() => handleButtonClick(',')}>,</button>
            <button disabled={false} onClick={() => handleButtonClick('CE')}>CE</button>
          </div>
        </div>
        <div className="column">
          <button disabled={false} onClick={() => handleButtonClick('<')}>{'<'}</button>
          <button disabled={false} onClick={() => handleButtonClick('*')}> *</button>
          <button disabled={false} onClick={() => handleButtonClick('+')}>+</button>
          <button disabled={false} onClick={() => handleButtonClick('=')}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;