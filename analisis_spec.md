# Análisis de qué viaja a React

## Especificación

La spec Flutter es `specs/001-dividir-cuenta/spec.md`. La copia inicial se comparó con
`../divisor_cuenta/specs/001-dividir-cuenta/spec.md`; el diff fue vacío (ver
[`evidencia/spec-diff-inicial.txt`](./evidencia/spec-diff-inicial.txt)).

### Criterio y unidad de conteo

Se cuenta cada requisito funcional, escenario de aceptación y entidad semántica una sola
vez. Las secciones de casos límite, criterios de éxito y suposiciones repiten o aclaran
decisiones ya expresadas en esos enunciados; se usan como verificación cruzada, no como
filas adicionales duplicadas. Ningún enunciado de esta spec prescribe Flutter, Dart,
widgets, paquetes, rutas de archivos ni una herramienta de pruebas.

| Enunciado de la spec | Tipo (QUÉ/CÓMO/MIXTO) | ¿Viaja a React? | Justificación |
|---|---|---|---|
| RF-001: permitir ingresar el monto total | QUÉ | Intacto | Entrada funcional independiente de la interfaz concreta. |
| RF-002: presentar la experiencia completa en una sola pantalla | QUÉ | Intacto | La restricción de experiencia sigue aplicando a una página React. |
| RF-003: permitir ingresar el número de personas | QUÉ | Intacto | Dato y comportamiento de usuario independientes de Flutter. |
| RF-004: permitir ingresar el porcentaje de propina, incluido 0% | QUÉ | Intacto | Regla funcional y valor límite independiente de la tecnología. |
| RF-005: permitir elegir redondeo exacto o hacia arriba | QUÉ | Intacto | Las dos opciones visibles y su significado son parte del producto. |
| RF-006: al calcular, repartir monto más propina y mostrar pago por persona con dos decimales | QUÉ | Intacto | Regla de negocio y resultado observable. |
| RF-007: el modo exacto presenta dos decimales | QUÉ | Intacto | Resultado especificado, sin imponer lenguaje ni librería. |
| RF-008: el modo hacia arriba redondea al entero siguiente y presenta dos decimales | QUÉ | Intacto | Regla de redondeo explícita que React debe reproducir. |
| RF-009: cero personas produce el mensaje exacto y ningún resultado | QUÉ | Intacto | Validación y salida observable, independientes del framework. |
| RF-010: monto no numérico produce el mensaje exacto y ningún resultado | QUÉ | Intacto | Validación y salida observable, independientes del framework. |
| RF-011: funcionar sin internet y sin base de datos | QUÉ | Intacto | Restricción de producto conservada en una aplicación React local. |
| Aceptación US1-1: 100.00, 4 personas, 10%, exacto → 27.50 | QUÉ | Intacto | El escenario y valor esperado son portables. |
| Aceptación US1-2: 90.00, 3 personas, 0%, exacto → 30.00 | QUÉ | Intacto | El escenario y valor esperado son portables. |
| Aceptación US1-3: 10.00, 3 personas, 0%, exacto → 3.33 | QUÉ | Intacto | El escenario y valor esperado son portables. |
| Aceptación US1-4: 10.00, 3 personas, 0%, hacia arriba → 4.00 | QUÉ | Intacto | El escenario y valor esperado son portables. |
| Aceptación US2-1: 50.00, 0 personas → mensaje indicado y ningún resultado | QUÉ | Intacto | El resultado y el mensaje no dependen del runner. |
| Aceptación US2-2: monto «abc» → «Monto inválido» y ningún resultado | QUÉ | Intacto | El texto de entrada, error y ausencia de resultado se conservan. |
| Entidad Cuenta: monto, personas y porcentaje de propina ingresados por el usuario | QUÉ | Intacto | Modelo conceptual del dominio, no una clase Dart obligatoria. |
| Entidad Resultado: pago individual derivado de Cuenta y redondeo, mostrado con dos decimales | QUÉ | Intacto | Concepto y presentación esperada siguen vigentes. |

**Conteo:** 19 enunciados únicos: 19 QUÉ, 0 CÓMO, 0 MIXTO.

```text
% CÓMO = 0 / 19 × 100 = 0%
```

Los escenarios US1/US2 también se reflejan en CE-001/CE-002; CE-003 confirma que los seis
escenarios funcionan sin red ni base de datos. Las viñetas de casos límite reiteran RF-009,
RF-010 y RF-011. Las tres suposiciones aclaran las reglas de propina y redondeo ya
concretadas por requisitos y ejemplos. No se contaron nuevamente esos duplicados.

No se identificó una decisión Flutter escondida en la spec, por lo que no se tuvo que
modificar ningún enunciado. La copia inicial y la copia final siguen idénticas.

## Constitution: comparación de reglas

Clasificación realizada contra
`../divisor_cuenta/.specify/memory/constitution.md` y
`.specify/memory/constitution.md`:

| Regla de Flutter | Clasificación | Regla React / justificación |
|---|---|---|
| SRP: cada clase tiene una razón para cambiar; cálculo no valida ni formatea | Adaptada en redacción | Cada función o módulo tiene una razón; el cálculo no valida ni formatea. JavaScript no exige clases para organizar estas responsabilidades. |
| OCP: agregar redondeo no obliga a editar el cálculo; estrategias mediante abstracción | Adaptada en redacción | Se habla de módulos y contrato de estrategia, conservando el mismo principio. |
| LSP: cualquier implementación sustituye a otra sin inspección del tipo concreto | Idéntica | El contrato puede cumplirse con objetos/funciones JavaScript; quien calcula no inspecciona su implementación. |
| ISP: interfaces pequeñas y sin dependencias de métodos no usados | Idéntica | El tamaño del contrato no depende de Flutter ni React. |
| DIP: presentation depende de abstracciones de domain, no de data concreta | Idéntica | Se conserva la dirección de dependencias. |
| Capas presentation, domain y data | Adaptada en redacción | Se conservan los nombres de capa; sus directorios pasan de `lib/` a `src/`. |
| Dependencias `presentation -> domain <- data` | Idéntica | La relación entre capas no cambia. |
| `lib/domain/` es Dart puro y no importa `package:flutter` | Adaptada en redacción | `src/domain/` es JavaScript puro y no importa React ni el DOM. |
| `main.dart` es el único lugar de composición | Adaptada en redacción | `src/main.jsx` es el único lugar que instancia implementaciones concretas. |
| No guardar secretos ni API keys en Git | Idéntica | La plataforma no cambia la regla. |
| Toda funcionalidad crítica tiene pruebas automatizadas | Idéntica | El criterio de calidad se mantiene; cambia el runner. |
| Criterios de aceptación se convierten en pruebas ejecutables | Idéntica | Los mismos escenarios se ejecutan con Vitest. |
| El estudiante explica cada función generada | Idéntica | La regla pedagógica es independiente de la tecnología. |
| Cambiar la Constitution requiere aprobación, justificación y versión semántica | Idéntica | Regla de gobernanza sin dependencia tecnológica; se conserva. |
| Revisar el código contra la Constitution | Idéntica | La práctica de revisión sigue siendo válida. |

**Conteo:** 10 reglas idénticas, 5 adaptadas en redacción y 0 reemplazadas. No se incorporó
ningún principio nuevo. Las adaptaciones sustituyen nombres de lenguaje, framework,
directorios o punto de composición; no cambian la intención de las reglas.
