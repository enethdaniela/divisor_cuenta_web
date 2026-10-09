import { formatearMoneda } from './formateadorMoneda.js'
import { useDivisor } from './useDivisor.js'
import '../App.css'

export function PantallaDivisor({ dependencias }) {
  const { formulario, resultado, error, actualizarCampo, calcular } =
    useDivisor(dependencias)

  function cambiar(campo) {
    return (evento) => actualizarCampo(campo, evento.target.value)
  }

  function enviar(evento) {
    evento.preventDefault()
    calcular()
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Cuenta clara, mesa tranquila</p>
        <h1>Divide la cuenta</h1>
        <p>
          Ingresa los datos de la cuenta y descubre cuánto aporta cada persona,
          propina incluida.
        </p>
      </header>

      <section className="calculator" aria-label="Divisor de cuenta">
        <form className="form-panel" onSubmit={enviar} noValidate>
          <h2>Datos de la cuenta</h2>
          <p>Completa los valores para calcular el reparto.</p>

          <div className="fields">
            <div className="field">
              <label htmlFor="monto">Monto total</label>
              <input
                id="monto"
                name="monto"
                type="text"
                inputMode="decimal"
                placeholder="Ej. 100.00"
                value={formulario.monto}
                onChange={cambiar('monto')}
              />
            </div>

            <div className="field">
              <label htmlFor="personas">Número de personas</label>
              <input
                id="personas"
                name="personas"
                type="text"
                inputMode="numeric"
                placeholder="Ej. 4"
                value={formulario.personas}
                onChange={cambiar('personas')}
              />
            </div>

            <div className="field">
              <label htmlFor="propina">Propina (%)</label>
              <input
                id="propina"
                name="propina"
                type="text"
                inputMode="decimal"
                value={formulario.propina}
                onChange={cambiar('propina')}
              />
            </div>

            <div className="field">
              <label htmlFor="modo">Modo de redondeo</label>
              <select
                id="modo"
                name="modo"
                value={formulario.modo}
                onChange={cambiar('modo')}
              >
                <option value="exacto">Exacto</option>
                <option value="arriba">Hacia arriba</option>
              </select>
            </div>
          </div>

          <button className="calculate-button" type="submit">
            Calcular
          </button>
        </form>

        <section className="result-panel" aria-live="polite">
          <h2>Tu resultado</h2>
          <p>Pago individual con la propina incluida.</p>
          {error ? (
            <p className="error-message" role="alert">
              {error}
            </p>
          ) : resultado ? (
            <div>
              <output className="result-value" data-testid="resultado">
                {formatearMoneda(resultado.montoPorPersona)}
              </output>
              <p className="result-caption">por persona</p>
            </div>
          ) : (
            <div className="result-placeholder">
              El total por persona aparecerá aquí.
            </div>
          )}
        </section>
      </section>

      <p className="page-footer">El cálculo se realiza localmente en tu navegador.</p>
    </main>
  )
}
