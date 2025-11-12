// client/src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Find the 'root' div in your public/index.html file
const root = ReactDOM.createRoot(document.getElementById('root'));

// Tell React to render your App component inside that div
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);