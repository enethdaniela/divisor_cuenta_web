# Salidas de verificación observadas

## Flutter, rama `sdd`

Comando ejecutado desde `divisor_cuenta/`:

```text
flutter test
```

La salida progresó hasta diez pruebas aprobadas y terminó con:

```text
00:02 +10: All tests passed!
```

## React: seis casos y LSP

Comando:

```text
npm exec vitest run test/division.test.js
```

Salida:

```text
Test Files  1 passed (1)
     Tests  7 passed (7)
```

## Suite React completa

Comando:

```text
npm test
```

Salida:

```text
Test Files  2 passed (2)
     Tests  10 passed (10)
```

## Build y lint

`npm run build`:

```text
vite v8.3.4 building client environment for production...
✓ 27 modules transformed.
dist/index.html                   0.59 kB │ gzip:  0.36 kB
dist/assets/index-BQKfwOTz.css    3.26 kB │ gzip:  1.36 kB
dist/assets/index-DPiqKVMQ.js   223.91 kB │ gzip: 70.14 kB
✓ built in 692ms
```

`npm run lint` terminó con código 0; Oxlint no imprimió hallazgos.

## Identidad de la spec

Comando ejecutado desde `divisor_cuenta_web/`:

```text
git diff --no-index -- ..\divisor_cuenta\specs\001-dividir-cuenta\spec.md specs\001-dividir-cuenta\spec.md
```

Salida: vacía; código de salida 0. La evidencia de la comparación inicial está en
[`spec-diff-inicial.txt`](./spec-diff-inicial.txt).

## Comprobaciones de arquitectura

- `git grep -n "from 'react'" -- src/domain/`: sin coincidencias (código de salida 1,
  resultado esperado para ausencia).
- `git grep -n -E "redondeoExacto|redondeoHaciaArriba" -- src/`: referencias solo en
  `src/main.jsx`; las implementaciones están en `src/data/`.
- `git grep -n -E "instanceof|=== 'exacto'|=== 'arriba'" -- src/domain/calcularDivision.js`:
  sin coincidencias.
- `git grep -n -E "toFixed|inválido|al menos una persona" -- src/domain/calcularDivision.js`:
  sin coincidencias.
- Smoke test HTTP en `http://127.0.0.1:5173/`: respuesta HTML con idioma `es`, título
  `Divisor de cuenta`; el navegador renderizó los cuatro campos y botón. Al ingresar 100, 4 y
  10% y pulsar `Calcular`, se observó `$27.50`.

Las tres búsquedas sin coincidencias devolvieron código 1 porque `git grep` usa ese código
cuando no encuentra texto; no son fallos de las verificaciones.
