import React from 'react';
import ReactDOM from 'react-dom/client';
import '@portfolio/shared/design-tokens.css';
import './App.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
);
