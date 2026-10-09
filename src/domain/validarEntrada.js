import { crearCuenta } from './cuenta.js'

export class EntradaInvalidaError extends Error {
  constructor(mensaje) {
    super(mensaje)
    this.name = 'EntradaInvalidaError'
  }
}

export function validarEntrada({ monto, personas, propina }) {
  const montoTexto = String(monto ?? '').trim().replace(',', '.')
  const montoNumerico = montoTexto === '' ? Number.NaN : Number(montoTexto)
  if (!Number.isFinite(montoNumerico) || montoNumerico < 0) {
    throw new EntradaInvalidaError('Monto inválido')
  }

  const personasTexto = String(personas ?? '').trim()
  const cantidadPersonas = /^[+-]?\d+$/.test(personasTexto)
    ? Number(personasTexto)
    : Number.NaN
  if (!Number.isSafeInteger(cantidadPersonas) || cantidadPersonas < 1) {
    throw new EntradaInvalidaError('Debe haber al menos una persona')
  }

  const propinaTexto = String(propina ?? '').trim().replace(',', '.')
  const porcentaje = propinaTexto === '' ? 0 : Number(propinaTexto)
  if (!Number.isFinite(porcentaje) || porcentaje < 0) {
    throw new EntradaInvalidaError('Propina inválida')
  }

  return crearCuenta({
    monto: montoNumerico,
    personas: cantidadPersonas,
    propina: porcentaje,
  })
}
