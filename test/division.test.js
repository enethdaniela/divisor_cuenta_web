import { describe, expect, it, vi } from 'vitest'
import { calcularDivision } from '../src/domain/calcularDivision.js'
import { validarEntrada } from '../src/domain/validarEntrada.js'
import { redondeoExacto } from '../src/data/redondeoExacto.js'
import { redondeoHaciaArriba } from '../src/data/redondeoHaciaArriba.js'
import { casos } from './casosDePrueba.js'

const estrategias = {
  exacto: redondeoExacto(),
  arriba: redondeoHaciaArriba(),
}

describe('casos de aceptación del dominio', () => {
  for (const caso of casos) {
    it(caso.nombre, () => {
      const entradas = {
        monto: String(caso.monto),
        personas: String(caso.personas),
        propina: String(caso.propina),
      }
      const calcular = vi.fn(calcularDivision)

      if (caso.errorEsperado) {
        let mensaje
        try {
          const cuenta = validarEntrada(entradas)
          calcular(cuenta, estrategias[caso.modo])
        } catch (error) {
          mensaje = error.message
        }

        expect(mensaje).toBe(caso.errorEsperado)
        expect(calcular).not.toHaveBeenCalled()
        return
      }

      const cuenta = validarEntrada(entradas)
      const resultado = calcular(cuenta, estrategias[caso.modo])

      expect(resultado.montoPorPersona).toBeCloseTo(caso.esperado, 2)
    })
  }
})

it('calcularDivision sustituye estrategias sin inspeccionar su tipo', () => {
  const cuenta = validarEntrada({
    monto: '10',
    personas: '3',
    propina: '0',
  })

  expect(calcularDivision(cuenta, estrategias.exacto).montoPorPersona).toBeCloseTo(
    10 / 3,
    2,
  )
  expect(
    calcularDivision(cuenta, estrategias.arriba).montoPorPersona,
  ).toBeCloseTo(4, 2)
})
