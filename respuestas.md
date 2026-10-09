# Deber 2 — Respuestas

## 1. ¿Qué porcentaje de la spec viajó?

Para hacer el conteo se agruparon duplicados de los casos límite, criterios de éxito y
suposiciones; se contaron una sola vez los 11 requisitos funcionales, los 6 escenarios de
aceptación y las 2 entidades semánticas. El resultado es **19 enunciados únicos**:

- **100% viajó intacto**: 19 de 19.
- **0% necesitó adaptación**: 0 de 19.
- **0% no pudo reutilizarse**: 0 de 19.
- **0% de los enunciados corresponde a CÓMO**: 0 de 19.

El diff inicial fue vacío y la copia final continúa idéntica a la fuente Flutter. La spec
describe comportamientos, reglas de negocio, mensajes y resultados, pero no impone Dart,
Flutter, widgets, rutas de código ni un runner. El 30% se interpreta únicamente como el
umbral pedagógico definido por este deber, no como una regla universal de SDD.

La bitácora de tiempo queda como `no registrado`: no se inició el cronómetro en el momento
definido por el deber y no se reconstruyeron minutos retrospectivamente.

Evidencia: [`analisis_spec.md`](./analisis_spec.md) y
[`evidencia/spec-diff-inicial.txt`](./evidencia/spec-diff-inicial.txt).

## 2. ¿Qué reglas de la Constitution cambiaron?

De las 15 reglas comparadas, **8 son idénticas, 7 se adaptaron en redacción y 0 fueron
reemplazadas**.

Se adaptó la redacción de:

1. SRP: de “clase” a función o módulo, manteniendo separado el cálculo de validación y formato.
2. OCP: el cálculo se describe como módulos JavaScript y el redondeo como estrategias
   sustituibles.
3. LSP: “interfaz” se expresa como un contrato estructural de estrategia de redondeo en
   JavaScript.
4. ISP: “interfaces” y “clases” se expresan como contratos y módulos JavaScript.
5. Capas: se conserva `presentation/domain/data`, con directorios bajo `src/` en lugar de `lib/`.
6. Dominio puro: Dart sin Flutter se convierte en JavaScript puro, sin React ni APIs del DOM.
7. Composición: `main.dart` se convierte en `src/main.jsx`.

LSP, ISP, DIP, dirección de dependencias, seguridad, pruebas, regla de la materia y
gobernanza mantienen la misma intención. No se añadieron principios nuevos. La evidencia y
la clasificación regla por regla están en [`analisis_spec.md`](./analisis_spec.md), junto a
las dos constituciones.

## 3. ¿Se modificó algún enunciado de la spec?

No. La spec no mezclaba decisiones de Flutter con el QUÉ: sus requisitos y escenarios son
tecnológicamente neutrales. La evidencia de copia inicial muestra un diff vacío; se volvió a
comparar después de implementar React y el diff siguió vacío. No fue necesario crear un
commit de corrección de la spec.

## 4. ¿Se conservaron los seis casos?

Sí. No cambió ningún resultado esperado ni mensaje:

| Caso | Entrada y modo | Resultado Flutter | Resultado React |
|---|---|---|---|
| Reparto normal | 100.00, 4 personas, 10%, exacto | 27.50 | 27.50 |
| Sin propina | 90.00, 3 personas, 0%, exacto | 30.00 | 30.00 |
| Cero personas | 50.00, 0 personas | «Debe haber al menos una persona», sin resultado | Igual |
| Monto no numérico | «abc» | «Monto inválido», sin resultado | Igual |
| Redondeo exacto | 10.00, 3 personas, 0% | 3.33 | 3.33 |
| Redondeo hacia arriba | 10.00, 3 personas, 0% | 4.00 | 4.00 |

El fixture Dart local existente representa el monto inválido con `double.nan`, y el fixture
React usa `Number.NaN`, siguiendo el formato de ejemplo del deber. La prueba de pantalla
React, como el escenario textual de la spec, ingresa literalmente `abc`. Es una diferencia
de representación interna para producir el mismo caso no numérico, no un cambio del
escenario ni de su resultado.

Hay 7 pruebas de dominio (seis escenarios más LSP) y 3 pruebas de pantalla; las 10 pasan.

## 5. ¿Qué partes del plan Flutter dejaron de tener sentido?

La comparación completa está guardada en [`evidencia/plan-diff.txt`](./evidencia/plan-diff.txt).
El diff registra diferencias entre planes de 187 líneas físicas, pero la bitácora cuenta
**15 decisiones tecnológicas** (no renglones Markdown):

| # | Plan Flutter | Plan React |
|---:|---|---|
| 1 | Dart con null safety | JavaScript moderno con ES modules |
| 2 | Flutter SDK | React |
| 3 | Aplicación móvil | Página web en navegador |
| 4 | `pubspec.yaml` y `pub` | `package.json` y npm |
| 5 | Flutter SDK y dependencias ya declaradas; sin paquetes nuevos | Dependencias web y runner npm del proyecto |
| 6 | `flutter_test` | Vitest, Testing Library y jsdom |
| 7 | Pruebas de widgets con `flutter_test` | Pruebas de pantalla con DOM simulado |
| 8 | Compilar APK Android con `flutter build apk --debug` | Empaquetar sitio con `npm run build` |
| 9 | Estado local con `setState` | Hook `useState` dentro de `useDivisor` |
| 10 | Raíz de código `lib/` | Raíz de código `src/` |
| 11 | Archivos Dart y nombres `snake_case` | Módulos `.js/.jsx` con `camelCase` |
| 12 | Entidades y contratos expresados con clases e interfaz Dart | Objetos JavaScript y contrato de función `aplicar(valor)` |
| 13 | `DivisorController` recibe casos de uso por constructor | `useDivisor` recibe dependencias y coordina el formulario |
| 14 | `main.dart` instancia estrategias y ejecuta `runApp` | `src/main.jsx` instancia estrategias y monta el árbol React |
| 15 | Verificaciones Flutter/Dart y compilación Android | Verificaciones de arquitectura, Vitest, lint y build Vite |

Tres cambios especialmente claros son el lenguaje/framework, el destino y comando de
compilación, y el runner de pruebas. Ninguno afecta a los seis resultados de la spec; son
decisiones del CÓMO.

## 6. ¿Cuál artefacto fue más y menos reusable?

El artefacto más reusable fue la **spec**: su copia inicial y final tienen diff vacío y los
19 enunciados se conservaron. Los casos de aceptación también viajaron en significado,
aunque su sintaxis se adaptó del test Dart a JavaScript/Vitest.

El menos reusable fue el **código de implementación**. Los widgets, tipos y mecanismos de
Flutter no se podían ejecutar en React, así que la aplicación se reimplementó en JavaScript
con JSX y se organizó en `src/domain/`, `src/data/` y `src/presentation/`. El plan Flutter
también requirió rehacer sus decisiones de lenguaje, plataforma, estado, pruebas y
compilación; véase el diff completo enlazado en la respuesta 5.

## Verificación observada

- Flutter base: `All tests passed!`, 10 pruebas.
- React: `npm test`, 10 pruebas aprobadas en 2 archivos.
- React dominio: 7 pruebas aprobadas (seis escenarios + LSP).
- React producción: `npm run build` terminó correctamente con Vite.
- React lint: `npm run lint` terminó sin hallazgos.
- Arquitectura: sin imports React desde `src/domain/`; las estrategias concretas se importan
  e instancian desde `src/main.jsx`; sin inspección de tipos ni formato/validación dentro de
  `calcularDivision`.
- Smoke test en navegador: el flujo 100, 4, 10% mostró `$27.50`.
- Node.js v24.20.0 y npm 11.19.0.

La inicialización de Spec Kit sí se ejecutó. Los comandos de chat
`/speckit-plan`, `/speckit-tasks`, `/speckit-analyze`, `/speckit-implement` y
`/speckit-converge` no se pudieron invocar desde esta interfaz; los documentos y la revisión
de coherencia se hicieron directamente y esa limitación está registrada en
[`evidencia/analisis-coherencia.md`](./evidencia/analisis-coherencia.md). No se afirma que
esos comandos se hayan ejecutado.

Las salidas verificadas de pruebas, build, lint y arquitectura están resumidas en
[`evidencia/verificaciones.md`](./evidencia/verificaciones.md); el diff íntegro del plan está
en [`evidencia/plan-diff.txt`](./evidencia/plan-diff.txt).
