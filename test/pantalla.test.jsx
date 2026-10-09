import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { calcularDivision } from '../src/domain/calcularDivision.js'
import { validarEntrada } from '../src/domain/validarEntrada.js'
import { redondeoExacto } from '../src/data/redondeoExacto.js'
import { redondeoHaciaArriba } from '../src/data/redondeoHaciaArriba.js'
import { PantallaDivisor } from '../src/presentation/PantallaDivisor.jsx'

function renderizarPantalla() {
  render(
    <PantallaDivisor
      dependencias={{
        calcularDivision,
        validarEntrada,
        estrategias: {
          exacto: redondeoExacto(),
          arriba: redondeoHaciaArriba(),
        },
      }}
    />,
  )
}

function ingresar(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), {
    target: { value: valor },
  })
}

describe('pantalla del divisor', () => {
  it('muestra 27.50 al calcular 100 entre 4 con 10% de propina', () => {
    renderizarPantalla()
    ingresar('Monto total', '100')
    ingresar('Número de personas', '4')
    ingresar('Propina (%)', '10')
    fireEvent.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByTestId('resultado')).toHaveTextContent('$27.50')
  })

  it('muestra error con cero personas y no presenta resultado', () => {
    renderizarPantalla()
    ingresar('Monto total', '50')
    ingresar('Número de personas', '0')
    fireEvent.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Debe haber al menos una persona',
    )
    expect(screen.queryByTestId('resultado')).not.toBeInTheDocument()
  })

  it('muestra error con monto no numérico y no presenta resultado', () => {
    renderizarPantalla()
    ingresar('Monto total', 'abc')
    ingresar('Número de personas', '4')
    fireEvent.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Monto inválido')
    expect(screen.queryByTestId('resultado')).not.toBeInTheDocument()
  })
})
