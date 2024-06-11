import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import './i18n.js'
import Spinner from "@/components/AdditionalComponnets/Spinner.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
            <App />
    </BrowserRouter>
  </React.StrictMode>,
);
