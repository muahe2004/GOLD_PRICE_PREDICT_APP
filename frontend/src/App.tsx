import React from 'react';
import logo from './gold.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import IndexView from "./views/index";
import GoldLSTMViewFetch from "./views/LSTM";

function Home() {
  const navigate = useNavigate();
  const goToPrediction = () => {
    navigate('/prediction');
  };

  const goToLSTM = () => {
    navigate('/prediction-lstm');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Dự đoán giá vàng!!!</p>
        <button className="App-link" onClick={goToPrediction}>
          XEM DỰ ĐOÁN NGAY BÂY GIỜ (NN)
        </button>

        <button className="App-link" onClick={goToLSTM}>
          XEM DỰ ĐOÁN NGAY BÂY GIỜ (LSTM)
        </button>
      </header>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prediction" element={<IndexView />} />
      <Route path="/prediction-lstm" element={<GoldLSTMViewFetch />} />
    </Routes>
  );
}

export default App;
