# Divisor de cuenta web

Aplicación de una sola pantalla en React para repartir una cuenta con propina entre varias
personas y elegir entre redondeo exacto o hacia arriba. Funciona localmente y no necesita
backend, red ni base de datos.

## Requisitos

- Node.js 22.12 o superior
- npm

## Comandos

```sh
npm install
npm run dev
npm test
npx vitest run test/division.test.js
npm run build
```

La estructura `src/domain`, `src/data` y `src/presentation` sigue la Constitution del
proyecto. La spec trasladada desde Flutter está en `specs/001-dividir-cuenta/spec.md`;
[`analisis_spec.md`](./analisis_spec.md) documenta qué enunciados viajan y la comparación de
ambas constituciones.
