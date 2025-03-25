import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './Home';
import GameScreen from './GameScreen';
import DeckBuilder from './DeckBuilder';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/deck-builder" element={<DeckBuilder />} />
          <Route path="/deck-builder/:deckId" element={<DeckBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;