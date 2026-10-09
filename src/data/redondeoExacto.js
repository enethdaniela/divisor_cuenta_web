import { crearEstrategiaRedondeo } from '../domain/estrategiaRedondeo.js'

export function redondeoExacto() {
  return crearEstrategiaRedondeo((valor) => valor)
}
