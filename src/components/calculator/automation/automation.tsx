import { useState } from 'react';
import './automation.css';

function Automation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="automation">
      { open&&
        <div className="automationContent">
        Test
      </div>
      }
      <button className="toggleAutomation" onClick={() => setOpen(!open)}>Knapp</button>
    </div>
  );
}

export default Automation;