import React from 'react'
import ReactDOM from 'react-dom/client'

import { InfoProvider, useInfo } from './context/useInfo.jsx'
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'
import Header from './components/Header.jsx'

import './styles/main.css'
import './styles/inputs.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InfoProvider>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </InfoProvider>
  </React.StrictMode>,
)
