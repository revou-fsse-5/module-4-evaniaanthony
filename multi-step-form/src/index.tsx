import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Find the root element in your HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
