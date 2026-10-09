# Comparación semántica de casos Flutter y React

La comparación es de entradas, reglas, salidas, mensajes y escenarios; no de sintaxis de los
archivos Dart y JavaScript.

| Escenario | Flutter (`test/casos_de_prueba.dart`) | React (`test/casosDePrueba.js`) | ¿Cambió el significado? |
|---|---|---|---|
| Reparto normal | 100, 4, 10%, exacto → 27.50 | 100, 4, 10%, exacto → 27.50 | No |
| Sin propina | 90, 3, 0%, exacto → 30.00 | 90, 3, 0%, exacto → 30.00 | No |
| Cero personas | 50, 0 → `Debe haber al menos una persona` | 50, 0 → mismo mensaje | No |
| Monto no numérico | `double.nan` en fixture; la pantalla acepta `abc` → `Monto inválido` | `Number.NaN` en fixture; la pantalla acepta `abc` → `Monto inválido` | No; sentinel equivalente |
| Redondeo exacto | 10, 3, 0%, exacto → 3.33 al presentar 2 decimales | 10, 3, 0%, exacto → 3.33 al presentar 2 decimales | No |
| Redondeo hacia arriba | 10, 3, 0%, arriba → 4.00 | 10, 3, 0%, arriba → 4.00 | No |

En React, la prueba de pantalla también comprueba que los dos errores no dejan un elemento de
resultado visible. El archivo completo de casos es `test/casosDePrueba.js`; el de Flutter
tenía cambios locales previos que se conservaron.
