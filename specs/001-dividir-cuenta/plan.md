# Plan de implementación: Divisor de cuenta en React

**Rama**: `main` | **Fecha**: 2026-10-09 | **Spec**: [spec.md](spec.md)

## Resumen

Recrear en React la experiencia de una sola pantalla que recibe monto, número de personas,
porcentaje de propina y modo de redondeo; valida los datos, calcula el pago individual y
muestra dos decimales. Se conservan las reglas, resultados y mensajes de la especificación
Flutter. La aplicación se ejecuta localmente, sin red ni base de datos.

## Contexto técnico

- **Lenguaje**: JavaScript moderno (ES modules), sin TypeScript.
- **Interfaz y desarrollo**: React con Vite.
- **Estado**: `useState` local; no se incorporan librerías externas de estado.
- **Pruebas**: Vitest, Testing Library y jsdom.
- **Persistencia y servicios**: ninguno; no hay backend, llamadas de red ni base de datos.
- **Node.js**: se verificó v24.20.0, que satisface el mínimo de 22.12.
- **Alcance**: una sola página, dos estrategias de redondeo, los seis escenarios de
  aceptación, una prueba de sustitución LSP y tres pruebas de pantalla.

## Decisiones de arquitectura

Se mantienen las capas de la constitución, con JavaScript puro en el dominio y dependencias
dirigidas desde la presentación hacia abstracciones del dominio. `main.jsx` es el único punto
que compone las implementaciones concretas.

```text
src/
├── domain/
│   ├── cuenta.js
│   ├── resultado.js
│   ├── estrategiaRedondeo.js
│   ├── validarEntrada.js
│   └── calcularDivision.js
├── data/
│   ├── redondeoExacto.js
│   └── redondeoHaciaArriba.js
├── presentation/
│   ├── useDivisor.js
│   ├── formateadorMoneda.js
│   └── PantallaDivisor.jsx
└── main.jsx

test/
├── setup.js
├── casosDePrueba.js
├── division.test.js
└── pantalla.test.jsx
```

### Responsabilidades

- `validarEntrada` transforma cadenas de formulario a una cuenta válida y entrega los
  mensajes de error definidos.
- `calcularDivision` calcula monto más propina, divide por personas y delega el redondeo a
  una estrategia recibida; no valida ni formatea y no inspecciona tipos.
- `redondeoExacto` conserva el valor calculado; `redondeoHaciaArriba` aplica techo al entero
  siguiente. Ambas cumplen el contrato `aplicar(valor)`.
- `useDivisor` recibe sus dependencias, administra el estado local del formulario y coordina
  validación y cálculo.
- `formateadorMoneda` convierte un resultado válido en una cadena con dos decimales.
- `PantallaDivisor` dibuja los campos, selección de estrategia, botón y resultado o error.
- `main.jsx` instancia dependencias concretas y entrega sus abstracciones a la presentación.

## Verificación

1. Ejecutar `npx vitest run test/division.test.js`: seis casos de aceptación y una prueba LSP.
2. Ejecutar `npm test`: toda la suite, incluidos los tres flujos de pantalla.
3. Confirmar que no hay imports de React/DOM desde `src/domain/`.
4. Confirmar que las implementaciones concretas de redondeo solo se instancian en `src/main.jsx`.
5. Confirmar que el cálculo no discrimina estrategias ni valida/formatea.
6. Ejecutar `npm run build`.

## Análisis de coherencia

La spec copiada no prescribe Flutter, Dart ni herramientas de pruebas. Sus reglas de producto
y seis escenarios son compatibles con la arquitectura React propuesta. La sustitución de
Flutter/Vitest afecta al plan de implementación y runner, no a ningún enunciado de la spec.
El análisis detallado QUÉ/CÓMO/MIXTO está en [`analisis_spec.md`](../../analisis_spec.md).
