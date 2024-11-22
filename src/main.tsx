import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppRouter } from './routers/AppRouter'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './style/light.css';
import './style/night.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
