import React from "react";
import { Routes, Route } from "react-router-dom";

import Pokemon from "./Pokemon";
import PokemonDetails from "./PokemonDetails";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (

      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>

  );
}

export default App;
