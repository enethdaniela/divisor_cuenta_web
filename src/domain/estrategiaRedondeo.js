export function crearEstrategiaRedondeo(aplicar) {
  if (typeof aplicar !== 'function') {
    throw new TypeError('La estrategia debe recibir una función aplicar(valor)')
  }

  return { aplicar }
}
