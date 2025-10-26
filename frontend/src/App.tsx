import React from 'react';
import logo from './gold.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import IndexView from "./views/index";

function Home() {
  const navigate = useNavigate();
  const goToPrediction = () => {
    navigate('/prediction');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Dự đoán giá vàng!!!</p>
        <button className="App-link" onClick={goToPrediction}>
          XEM DỰ ĐOÁN NGAY BÂY GIỜ
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
    </Routes>
  );
}

export default App;
