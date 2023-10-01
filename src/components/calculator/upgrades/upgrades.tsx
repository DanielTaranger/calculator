import { useState, useEffect } from 'react';
import './upgrades.css';
import { Costs, maxDigitInput } from '../../../types';
import { round } from 'mathjs';

function Upgrades(
  { upgradeTickrate, upgradeMaxDigit,
    upgradeMaxInput, upgradeButton, total,
    tickRate, tickRateCost,
    maxDigit, maxDigitCost,
    maxInput, maxInputCost,
    buttonCost, }:
    {
      upgradeTickrate: () => void,
      upgradeMaxDigit: () => void,
      upgradeMaxInput: () => void,
      upgradeButton: () => void,
      total: number, costs: Costs,
      maxDigitInput: maxDigitInput,
      maxDigit: number
      maxInput: number,
      tickRate: number,
      tickRateCost: number,
      maxDigitCost: number,
      maxInputCost: number,
      buttonCost: number,
    }) {

  const [open, setOpen] = useState(false);

  const isAffordableTick = total >= tickRateCost;
  const isAffordableDigit = total >= maxDigitCost;
  const isAffordableInput = total >= maxInputCost;
  const isAffordableButton = total >= buttonCost;

  return (
    <>
      <div className={`${open ? 'open automation' : 'automation'}`}>
        <button disabled={!isAffordableTick} className="upgradeButton" onClick={upgradeTickrate}>
          <div>Tickrate: {round(tickRate)}</div>
          <div>Cost: {tickRateCost}</div>
        </button>

        <button disabled={!isAffordableDigit} className="upgradeButton" onClick={upgradeMaxDigit}>
          <div>Max digits: {maxDigit}</div>
          <div>Cost: {maxDigitCost}</div>
        </button>

        <button disabled={!isAffordableInput} className="upgradeButton" onClick={upgradeMaxInput}>
          <div>Max input length: {maxInput}</div>
          <div>Cost: {maxInputCost}</div>
        </button>
        <button disabled={!isAffordableButton} className="upgradeButton" onClick={upgradeButton}>
          <div>Unlock a new button</div>
          <div>Cost: {buttonCost}</div>
        </button>
      </div>
      <button className={`${open ? 'open toggleAutomation' : 'toggleAutomation'}`}
        onClick={() => setOpen(!open)}>{`${open ? '>' : '<'}`}
      </button>
    </>
  );
}

export default Upgrades;