import { useState } from 'react'
import { EntradaInvalidaError } from '../domain/validarEntrada.js'

const formularioInicial = {
  monto: '',
  personas: '',
  propina: '0',
  modo: 'exacto',
}

export function useDivisor({ calcularDivision, validarEntrada, estrategias }) {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)

  function actualizarCampo(campo, valor) {
    setFormulario((actual) => ({ ...actual, [campo]: valor }))
  }

  function calcular() {
    setResultado(null)
    setError(null)

    try {
      const cuenta = validarEntrada(formulario)
      setResultado(calcularDivision(cuenta, estrategias[formulario.modo]))
    } catch (excepcion) {
      if (!(excepcion instanceof EntradaInvalidaError)) {
        throw excepcion
      }
      setError(excepcion.message)
    }
  }

  return { formulario, resultado, error, actualizarCampo, calcular }
}
