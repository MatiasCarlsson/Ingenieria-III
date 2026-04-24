# YVY-PORA - Aplicacion de Huerta Urbana

## Descripcion

Proyecto de aplicacion web para huertas urbanas desarrollado para la Actividad #8 de Ingenieria III.

## Requisitos

- Git
- Node.js 20+
- npm
- Navegador web moderno

## Clonar y ejecutar

```bash
git clone https://github.com/MatiasCarlsson/Ingenieria-III.git
cd Ingenieria-III
npm install
npm run lint
npm test
npm run build
```

Para visualizar la app:

```bash
# opcion simple
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Integracion Continua

Archivo de configuracion: [.github/workflows/ci.yml](.github/workflows/ci.yml)

El pipeline se ejecuta en:

- push a ramas main, develop, matias, selene, emanuel, hannah
- pull request a main y develop
- ejecucion manual con opcion de simulacion de errores

Pasos automatizados:

1. Instalacion de dependencias
2. Verificacion de estilo con ESLint
3. Verificacion de al menos 5 pruebas unitarias
4. Ejecucion de pruebas unitarias con cobertura
5. Build del proyecto
6. Generacion y subida de reporte de estado del pipeline

Estado del pipeline:
https://github.com/MatiasCarlsson/Ingenieria-III/actions

## Pruebas unitarias implementadas

Las pruebas validan comportamientos reales de la app:

- busqueda en Home (normalizacion y validacion de query)
- favoritos de tarjetas y favorito principal
- toggle de visibilidad de contrasena en Login
- validaciones del formulario de Login

Archivo de pruebas: [JS/app.logic.test.js](JS/app.logic.test.js)

## Simulacion de errores comunes

Desde workflow_dispatch se puede activar `simulate_errors` para evidenciar:

1. Test fallido tras fusion de ramas
2. Error de estilo/sintaxis detectado por linter
3. Problema de dependencias

Se genera el artifact `ci-error-simulation-report` con el resultado.

## Entregables de la actividad

- README con instrucciones de uso y CI (este archivo)
- Enlace al workflow de CI: [.github/workflows/ci.yml](.github/workflows/ci.yml)
- Documento PDF (formato APA) con:
  - capturas del pipeline
  - pasos automatizados
  - errores detectados y resolucion
  - recomendaciones y aprendizajes
  - enlace a backlog/herramienta de gestion TIF
  - enlace al repositorio
