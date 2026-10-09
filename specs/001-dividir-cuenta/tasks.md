# Tareas: Divisor de cuenta en React

**Documentos de entrada**: `specs/001-dividir-cuenta/spec.md`, `plan.md` y
`.specify/memory/constitution.md`.

## Fase 1: Preparación y artefactos

- [X] T001 Crear el proyecto React con Vite y verificar Node.js 22.12 o superior.
- [X] T002 Inicializar un repositorio Git separado para `divisor_cuenta_web`.
- [X] T003 Inicializar Spec Kit con integración GitHub Copilot.
- [X] T004 Copiar la spec Flutter del feature `001-dividir-cuenta` y verificar un diff inicial vacío.
- [X] T005 Analizar la portabilidad de spec y constitution antes de planificar React.

## Fase 2: Planificación y pruebas

- [X] T006 Definir la arquitectura React y estructura por capas en `plan.md`.
- [X] T007 Configurar Vitest, Testing Library y jsdom en `vite.config.js` y `test/setup.js`.
- [X] T008 Trasladar los seis escenarios sin cambiar valores ni mensajes a `test/casosDePrueba.js`.
- [X] T009 Crear pruebas de dominio parametrizadas y prueba de sustitución LSP en `test/division.test.js`.
- [X] T010 Crear las tres pruebas de pantalla para cálculo, cero personas y monto inválido.

## Fase 3: Dominio y estrategias

- [X] T011 Implementar las entidades de dominio Cuenta y Resultado en JavaScript puro.
- [X] T012 Definir el contrato pequeño de estrategia de redondeo `aplicar(valor)`.
- [X] T013 Implementar la validación del monto, número de personas y propina con los mensajes especificados.
- [X] T014 Implementar `calcularDivision` separando cálculo, validación y formato.
- [X] T015 Implementar las estrategias exacta y hacia arriba como módulos de `src/data/`.

## Fase 4: Presentación e integración

- [X] T016 Implementar el hook inyectable `useDivisor` con estado local y sin gestor externo.
- [X] T017 Implementar el formateador de moneda independiente.
- [X] T018 Implementar la pantalla de una página con entradas, modo, cálculo, error y resultado.
- [X] T019 Instanciar estrategias y dependencias concretas únicamente desde `src/main.jsx`.

## Fase 5: Validación

- [X] T020 Ejecutar los seis casos de aceptación y prueba LSP.
- [X] T021 Ejecutar toda la suite y confirmar las tres pruebas de pantalla.
- [X] T022 Verificar imports de dominio, composición, LSP y separación de responsabilidades.
- [X] T023 Ejecutar `npm run build`.
- [X] T024 Comparar spec/casos/constitution/plan y documentar las respuestas del deber.
