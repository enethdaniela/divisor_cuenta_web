import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { calcularDivision } from './domain/calcularDivision.js'
import { validarEntrada } from './domain/validarEntrada.js'
import { redondeoExacto } from './data/redondeoExacto.js'
import { redondeoHaciaArriba } from './data/redondeoHaciaArriba.js'
import './index.css'
import App from './App.jsx'

const dependencias = {
  calcularDivision,
  validarEntrada,
  estrategias: {
    exacto: redondeoExacto(),
    arriba: redondeoHaciaArriba(),
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App dependencias={dependencias} />
  </StrictMode>,
)
