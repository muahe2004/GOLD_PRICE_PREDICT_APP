import React from 'react';
import logo from './gold.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Dự đoán giá vàng!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          XEM DỰ ĐOÁN NGAY BÂY GIỜ
        </a>
      </header>
    </div>
  );
}

export default App;
