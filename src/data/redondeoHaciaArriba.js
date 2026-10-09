import { crearEstrategiaRedondeo } from '../domain/estrategiaRedondeo.js'

export function redondeoHaciaArriba() {
  return crearEstrategiaRedondeo((valor) => Math.ceil(Math.max(0, valor)))
}
