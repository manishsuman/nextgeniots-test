import React from 'react';
import './App.css';
import Public from "./components/public/public";
import Private from "./components/private/private";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
function App() {
  return (
    <React.Fragment>
        <div className="App">
          <Routes>
          <Route exact path="/" element={<Public />} />
          <Route exact path="/create-new" element={<Private />} />
          </Routes>
        </div>
    </React.Fragment>

  );
}

export default App;
