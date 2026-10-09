# Constitución del Divisor de Cuenta Web

## Calidad de código

### I. Principio de responsabilidad única (SRP)
Cada función o módulo DEBE tener una sola razón para cambiar. El cálculo NO DEBE validar
entradas ni formatear resultados; esas responsabilidades deben permanecer separadas.

### II. Principio abierto/cerrado (OCP)
Agregar una nueva regla de redondeo NO DEBE obligar a editar los módulos de cálculo
existentes. El comportamiento de redondeo DEBE proporcionarse mediante una abstracción que
admita nuevas estrategias.

### III. Principio de sustitución de Liskov (LSP)
Cualquier implementación del contrato de redondeo DEBE poder sustituir a otra sin que quien
la usa tenga que comprobar el tipo concreto.

### IV. Principio de segregación de interfaces (ISP)
Los contratos DEBEN ser pequeños. Un módulo NO DEBE depender de funciones que no utiliza.

### V. Principio de inversión de dependencias (DIP)
`src/presentation/` DEBE depender de abstracciones de `src/domain/` y NO DEBE depender de
implementaciones concretas de `src/data/`.

## Arquitectura

- La aplicación DEBE usar las capas `src/presentation/`, `src/domain/` y `src/data/`.
- Las dependencias DEBEN seguir `presentation -> domain <- data`.
- `src/domain/` DEBE ser JavaScript puro y NO DEBE importar React ni APIs del DOM.
- `src/main.jsx` DEBE ser el único lugar donde se instancian implementaciones concretas.

## Seguridad

- NO SE DEBEN guardar secretos ni claves API en el repositorio.

## Calidad y pruebas

- Toda funcionalidad crítica DEBE tener pruebas automatizadas.
- Los criterios de aceptación de cada especificación DEBEN convertirse en pruebas
  ejecutables.

## Regla de la materia

- El estudiante DEBE poder explicar cada función generada por el agente: qué hace, por qué
  existe, qué recibe, qué devuelve y qué errores produce.

## Gobernanza

Esta constitución rige las decisiones de implementación y revisión del proyecto. Cambiar
estas reglas requiere la aprobación de la persona propietaria del proyecto, una justificación
documentada y una actualización de versión semántica: MAJOR para cambios incompatibles,
MINOR para reglas nuevas o ampliadas sustancialmente y PATCH para aclaraciones que no cambian
la intención. Los cambios al código de la aplicación DEBEN revisarse según estas reglas.

**Versión**: 1.0.0 | **Ratificada**: 2026-10-09 | **Última modificación**: 2026-10-09
