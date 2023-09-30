import { useState } from 'react';
import './upgrades.css';
import {Costs} from '../../../types';

function Upgrades({ upgradeTickrate, total, costs }:{ upgradeTickrate: () => void, total: number, costs: Costs }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    upgradeTickrate();
  }

  const isAffordable = total >= costs.tickRateCost;

  return (
    <>
      <div className={`${open ? 'open automation' : 'automation'}`}>
        <button disabled={!isAffordable} className="upgradeButton" onClick={handleClick}>
          <div>Tickrate</div>
          <div>kostnad: 80</div>
        </button>
      </div>
      <button className={`${open ? 'open toggleAutomation' : 'toggleAutomation'}`}
        onClick={() => setOpen(!open)}>{`${open ? '>' : '<'}`}
      </button>
    </>
  );
}

export default Upgrades;