import { crearResultado } from './resultado.js'

export function calcularDivision(cuenta, estrategia) {
  const montoConPropina = cuenta.monto * (1 + cuenta.propina / 100)
  const pagoPorPersona = montoConPropina / cuenta.personas

  return crearResultado(estrategia.aplicar(pagoPorPersona))
}
