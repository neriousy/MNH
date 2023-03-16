import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { CharContextProvider } from './context/CharContext';
import './index.css';
import App from './layout/App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CharContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CharContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
