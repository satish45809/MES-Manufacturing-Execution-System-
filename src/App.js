import React, { useState } from "react";
import OperatorPortal from "./OperatorPortal";
import SupervisorPortal from "./SupervisorPortal";
import "./index.css";

function App() {
  const [view, setView] = useState("operator");
  const [entries, setEntries] = useState([]); // Shared entries

  return (
    <div>
      <header className="main-header">
        <button onClick={() => setView("operator")}>Operator Portal</button>
        <button onClick={() => setView("supervisor")}>Supervisor Portal</button>
      </header>
      {view === "operator" ? (
        <OperatorPortal entries={entries} setEntries={setEntries} />
      ) : (
        <SupervisorPortal entries={entries} setEntries={setEntries} />
      )}
    </div>
  );
}

export default App;