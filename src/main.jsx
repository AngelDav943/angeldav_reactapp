import React from 'react'
import ReactDOM from 'react-dom/client'

import { InfoProvider, useInfo } from './context/useInfo.jsx'
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.tsx'

import './styles/main.css'
import './styles/basic.css'
import './styles/inputs.css'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InfoProvider>
      <BrowserRouter>
        <Header />
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <Footer />
      </BrowserRouter>
    </InfoProvider>
  </React.StrictMode>,
)