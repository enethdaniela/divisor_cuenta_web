# Tareas: Divisor de cuenta en React

**Documentos de entrada**: `specs/001-dividir-cuenta/spec.md`, `plan.md` y
`.specify/memory/constitution.md`.

## Fase 1: Preparación y artefactos

- [ ] T001 Crear el proyecto React con Vite y verificar Node.js 22.12 o superior.
- [ ] T002 Inicializar un repositorio Git separado para `divisor_cuenta_web`.
- [ ] T003 Inicializar Spec Kit con integración GitHub Copilot.
- [ ] T004 Copiar la spec Flutter del feature `001-dividir-cuenta` y verificar un diff inicial vacío.
- [ ] T005 Analizar la portabilidad de spec y constitution antes de planificar React.

## Fase 2: Planificación y pruebas

- [ ] T006 Definir la arquitectura React y estructura por capas en `plan.md`.
- [ ] T007 Configurar Vitest, Testing Library y jsdom en `vite.config.js` y `test/setup.js`.
- [ ] T008 Trasladar los seis escenarios sin cambiar valores ni mensajes a `test/casosDePrueba.js`.
- [ ] T009 Crear pruebas de dominio parametrizadas y prueba de sustitución LSP en `test/division.test.js`.
- [ ] T010 Crear las tres pruebas de pantalla para cálculo, cero personas y monto inválido.

## Fase 3: Dominio y estrategias

- [ ] T011 Implementar las entidades de dominio Cuenta y Resultado en JavaScript puro.
- [ ] T012 Definir el contrato pequeño de estrategia de redondeo `aplicar(valor)`.
- [ ] T013 Implementar la validación del monto, número de personas y propina con los mensajes especificados.
- [ ] T014 Implementar `calcularDivision` separando cálculo, validación y formato.
- [ ] T015 Implementar las estrategias exacta y hacia arriba como módulos de `src/data/`.

## Fase 4: Presentación e integración

- [ ] T016 Implementar el hook inyectable `useDivisor` con estado local y sin gestor externo.
- [ ] T017 Implementar el formateador de moneda independiente.
- [ ] T018 Implementar la pantalla de una página con entradas, modo, cálculo, error y resultado.
- [ ] T019 Instanciar estrategias y dependencias concretas únicamente desde `src/main.jsx`.

## Fase 5: Validación

- [ ] T020 Ejecutar los seis casos de aceptación y prueba LSP.
- [ ] T021 Ejecutar toda la suite y confirmar las tres pruebas de pantalla.
- [ ] T022 Verificar imports de dominio, composición, LSP y separación de responsabilidades.
- [ ] T023 Ejecutar `npm run build`.
- [ ] T024 Comparar spec/casos/constitution/plan y documentar las respuestas del deber.
