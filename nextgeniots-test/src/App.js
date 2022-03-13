import React from 'react';
import './App.css';
import Public from "./components/public/public";
import Private from "./components/private/private";
import PageNotFound from "./components/pagenotfound/page-not-found";
import {Route, Routes } from "react-router-dom";
function App() {
  const authState=localStorage.getItem("auth");
  return (
    <React.Fragment>
        <div className="App">
          <Routes>
          <Route exact path="/" element={<Public />} />
          {authState=="true"&&
          <Route exact path="/create-new" element={<Private />} />
          }
          
          <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </div>
    </React.Fragment>

  );
}

export default App;
