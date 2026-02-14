import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/cart';
import "bootstrap/dist/css/bootstrap.min.css";


import 'antd/dist/reset.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);


reportWebVitals();
