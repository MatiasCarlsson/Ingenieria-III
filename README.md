# YVY-PORA - Aplicacion de Huerta Urbana

_"Tierra buena - Guía para tu huerta urbana"_

## Descripcion

**YVY-PORA** es una aplicacion web moderna diseñada para ayudar a usuarios a gestionar huertas urbanas de forma inteligente. Integra información sobre cultivos, condiciones climáticas, fases lunares y herramientas interactivas para maximizar la productividad en espacios reducidos.

Este proyecto fue desarrollado en el marco de **Actividad #8: Integración Continua** de la materia Ingenieria III, demostrando prácticas profesionales de:

- Gestión de configuración con Git y GitHub
- Automatización con CI/CD (GitHub Actions)
- Testing unitario y linting automático
- Colaboración distribuida entre integrantes

### Características principales

- **Página de inicio interactiva**: Muestra cultivos disponibles, clima, fase lunar
- **Sistema de favoritos**: Marcar cultivos favoritos de forma persistente
- **Búsqueda integrada**: Encuentra cultivos por nombre o características
- **Autenticación**: Página de login con validación de formularios
- **Interfaz responsiva**: Diseño adaptable a dispositivos móviles
- **Navegación de pestañas**: Acceso a Home, Mi Huerta, Explorar, Comunidad

## Requisitos Previos

- **Git** - Para clonar y versionar el código
- **Node.js 20+** - Runtime de JavaScript
- **npm** - Gestor de dependencias
- **Navegador web moderno** - Chrome, Firefox, Safari, Edge

## Estructura del Proyecto

```
Ingenieria-III/
├── index.html                    # Página principal (Home)
├── page/
│   └── login.html               # Página de autenticación
├── JS/
│   ├── index.js                 # Lógica de Home (búsqueda, favoritos, navegación)
│   ├── login.js                 # Lógica de autenticación (validación, toggle password)
│   └── app.logic.test.js        # Suite de pruebas unitarias (8 tests)
├── styles/
│   ├── global.css               # Estilos generales y variables CSS
│   ├── index.css                # Estilos específicos de Home
│   └── login.css                # Estilos específicos de Login
├── public/
│   └── assets/fonts/img/        # Imágenes, fuentes (mascota, cultivos, iconos)
├── .github/
│   └── workflows/ci.yml         # Pipeline de CI/CD con GitHub Actions
├── package.json                 # Dependencias y scripts npm
├── eslint.config.js             # Configuración de linter
└── README.md                    # Este archivo
```

## Tecnologías Utilizadas

| Tecnología              | Versión | Propósito                     |
| ----------------------- | ------- | ----------------------------- |
| **HTML5**               | Native  | Estructura y semántica        |
| **CSS3**                | Native  | Estilos y animaciones         |
| **JavaScript (ES2022)** | Native  | Interactividad y lógica       |
| **Node.js**             | 20.x+   | Runtime                       |
| **npm**                 | Latest  | Gestor de dependencias        |
| **ESLint**              | 9.25.1  | Linter y validación de código |
| **Jest**                | 29.7.0  | Framework de testing          |
| **GitHub Actions**      | Native  | Automatización de CI/CD       |

## Clonar y Ejecutar Localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasCarlsson/Ingenieria-III.git
cd Ingenieria-III
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Validar código (linter)

```bash
npm run lint
```

### 4. Ejecutar pruebas unitarias

```bash
npm test
```

Ver cobertura de pruebas:

```bash
npm run test:coverage
```

### 5. Build del proyecto

```bash
npm run build
```

### 6. Ejecutar en navegador

Opción A - Servidor local:

```bash
python -m http.server 8000
# Luego abrir: http://localhost:8000
```

Opción B - Doble click en archivos:

- `index.html` para Home
- `page/login.html` para Login

### Flujo de navegación en la app

1. **Home** (`http://localhost:8000/index.html`)
   - Botón "Login" en el header → navega a `/page/login.html`
   - Buscador para filtrar cultivos
   - Favoritos interactivos
   - Información de clima y fase lunar

2. **Login** (`http://localhost:8000/page/login.html`)
   - Validación de usuario y contraseña
   - Toggle para mostrar/ocultar contraseña
   - Botón "Volver al inicio" → regresa a `/index.html`

## Arquitectura de Código

### Refactoring para testabilidad

El código JavaScript fue refactorizado para exponer funciones puras y testeables, sin afectar la funcionalidad visual:

#### Home (`JS/index.js`)

Funciones exportadas:

- `normalizeSearchQuery(rawValue)` - Normaliza input de búsqueda
- `shouldRunSearch(rawValue)` - Valida si la búsqueda es válida
- `toggleSmallFavoriteIcon(currentIcon)` - Alterna estado de favorito pequeño
- `toggleLargeFavoriteIcon(currentIcon)` - Alterna estado de favorito grande
- `applyActiveNav(navItems, activeIndex)` - Aplica clase active al navegador

#### Login (`JS/login.js`)

Funciones exportadas:

- `getNextPasswordFieldType(currentType)` - Toggle entre password/text
- `validateLoginFields(usuario, password)` - Valida campos y retorna errores

### Interactividad en la UI

**Home:**

- Búsqueda en tiempo real con validación
- Sistema de favoritos (corazones que alternan)
- Navegación de pestañas con estado activo
- Enlace directo a Login en header

**Login:**

- Validación de usuario y contraseña (campos requeridos)
- Toggle de visibilidad de contraseña con icono
- Mensajes de error inline por campo
- Carga simulada (1.5s) al hacer submit
- Enlace "Volver al inicio" para regresar a Home

## Integracion Continua (CI/CD)

### Archivo de configuración

[`.github/workflows/ci.yml`](.github/workflows/ci.yml)

### ¿Cuándo se ejecuta?

El pipeline corre automáticamente en:

1. **Push** a cualquiera de estas ramas:
   - `main` (rama principal de producción)
   - `develop` (rama de desarrollo)
   - `matias`, `selene`, `emanuel`, `hannah` (ramas personales de integrantes)

2. **Pull Request** hacia `main` o `develop`

3. **Manual** desde Actions (workflow_dispatch) con opción de simular errores

### Flujo del pipeline

```
┌─────────────────────────────────────────────────────────┐
│ Push / PR / Manual Dispatch                              │
└──────────┬──────────────────────────────────────────────┘
           │
           ├──► JOB: test-and-lint (ubuntu-latest)
           │    ├─ Checkout código
           │    ├─ Setup Node.js 20.x
           │    ├─ npm install
           │    ├─ npm run lint (ESLint)
           │    ├─ Validar >= 5 tests
           │    ├─ npm test (Jest con cobertura)
           │    └─ Upload coverage artifact
           │
           ├──► JOB: build (depende de test-and-lint)
           │    ├─ Checkout código
           │    ├─ Setup Node.js 20.x
           │    ├─ npm install
           │    └─ npm run build
           │
           ├──► JOB: pipeline-report (siempre, después de ambos)
           │    ├─ Obtiene resultado de test-and-lint
           │    ├─ Obtiene resultado de build
           │    ├─ Genera reporte markdown
           │    └─ Upload ci-report artifact
           │
           └──► JOB: simulate-common-errors (solo si manual + simulate_errors=true)
                ├─ Simula test fallido
                ├─ Simula error de linter
                ├─ Simula problema de dependencias
                └─ Upload simulation-report artifact
```

### Pasos detallados

#### 1. Instalación de dependencias

```bash
npm install
```

Instala:

- `eslint@9.25.1` - Validador de código
- `jest@29.7.0` - Framework de testing
- `globals@15.15.0` - Variables globales de browser/node

#### 2. Linting (ESLint)

```bash
npm run lint
```

Valida:

- Sintaxis correcta de JavaScript
- Uso de variables (se permite prefijo `_` para ignoradas)
- Reglas de estilo
- Se permite `console.log()` (para debugging)

#### 3. Validación de pruebas mínimas

```bash
find JS -type f \( -name "*.test.js" -o -name "*.spec.js" \)
```

Cuenta pruebas y falla si hay menos de 5.

#### 4. Ejecución de tests

```bash
npm test -- --coverage
```

Ejecuta pruebas unitarias (8 tests):

- 5 del Home (búsqueda, favoritos)
- 3 del Login (password, validación)

Genera cobertura en `coverage/`

#### 5. Build

```bash
npm run build
```

Valida que el proyecto pueda compilarse (en este caso, es un app estática así que solo confirma OK).

#### 6. Reporte de estado

Genera `ci-report.md` con:

- Estado del pipeline (SUCCESS/FAILURE)
- Resultado de cada job
- Timestamp y rama/commit

### Artefactos generados

Después de cada ejecución, se suben automáticamente:

1. **coverage-report/** - Reporte de cobertura de tests
2. **ci-report** - Reporte general del pipeline
3. **ci-error-simulation-report** (solo si se simula) - Reporte de errores

Ver en: [GitHub Actions](https://github.com/MatiasCarlsson/Ingenieria-III/actions)

## Pruebas Unitarias

### Suite de tests: `JS/app.logic.test.js`

**Total: 8 pruebas**

#### Home (5 tests)

```javascript
✓ normalizeSearchQuery trims spaces
✓ shouldRunSearch returns false for empty query
✓ shouldRunSearch returns true for valid query
✓ toggleSmallFavoriteIcon switches heart state
✓ toggleLargeFavoriteIcon switches heart state
```

#### Login (3 tests)

```javascript
✓ getNextPasswordFieldType toggles type
✓ validateLoginFields marks empty values as invalid
✓ validateLoginFields passes when user and password are valid
```

### Ejecutar tests localmente

```bash
# Ver resultados simples
npm test

# Ver con cobertura
npm run test:coverage
```

### Cobertura de código

El reporte incluye:

- Statements: % de líneas ejecutadas
- Branches: % de condicionales probados
- Functions: % de funciones cubiertas
- Lines: % de líneas de código probadas

## Simulación de Errores Comunes

### Cómo ejecutar simulación

1. Ir a: https://github.com/MatiasCarlsson/Ingenieria-III/actions
2. Seleccionar workflow "CI/CD Pipeline"
3. Click en "Run workflow"
4. Activar toggle "Ejecutar simulacion de errores comunes"
5. Click en "Run workflow"

### Errores que se simulan

#### 1. Test fallido tras fusión

```javascript
test("intentional failure simulation", () => {
  expect(true).toBe(false); // FALLA
});
```

**Resultado:** El step "Simulate failing test after merge" falla (`failure`)
**Propósito:** Demostrar que un test roto detiene el pipeline

#### 2. Error de estilo/sintaxis (Linter)

```javascript
const broken =  // Sintaxis incompleta
```

**Resultado:** ESLint detecta error y falla el step
**Propósito:** Demostrar validación de código automática

#### 3. Problema de dependencias

```bash
npm install package-does-not-exist-yvy-pora-123@0.0.1
```

**Resultado:** npm no encuentra el paquete, falla
**Propósito:** Simular conflict de dependencias

**Nota:** Cada simulación usa `continue-on-error: true`, así que el pipeline continúa y se registran todos los resultados en el artifact `ci-error-simulation-report.md`.

## Ramas del Repositorio

| Rama        | Propósito                                     | Integrante      |
| ----------- | --------------------------------------------- | --------------- |
| **main**    | Rama principal - código listo para producción | Equipo          |
| **develop** | Rama de integración de desarrollo             | Equipo          |
| **matias**  | Rama de desarrollo personal                   | Matías Carlsson |
| **selene**  | Rama de desarrollo personal                   | Selene          |
| **emanuel** | Rama de desarrollo personal                   | Emanuel         |
| **hannah**  | Rama de desarrollo personal                   | Hannah          |

### Flujo de trabajo recomendado

1. Cada integrante trabaja en su rama personal
2. Cuando una feature está lista, crear un Pull Request hacia `develop`
3. El CI valida automáticamente (lint, tests, build)
4. Revisor aprueba o solicita cambios
5. Al mergearse a `develop`, se dispara otro CI
6. Periódicamente, `develop` se mergea a `main` para release

## Entregables de la Actividad #8

### 1. Este README

- ✅ Instrucciones para clonar y ejecutar el proyecto
- ✅ Explicación del workflow de CI
- ✅ Enlace al archivo de configuración CI: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
- ✅ Descripción detallada de cómo funciona la integración continua

### 2. Configuración de CI en GitHub

- ✅ Repositorio Git con ramas (main, develop, personales)
- ✅ GitHub Actions configurado automáticamente en el repo
- ✅ Pipeline con lint, tests, build y reporte de estado

### 3. Pruebas unitarias

- ✅ Mínimo 5 pruebas (implementadas 8 totales)
- ✅ Cobertura de funcionalidades reales de la app
- ✅ Reporte de cobertura generado automáticamente

### 4. Simulación de errores comunes

- ✅ Test fallido tras fusión
- ✅ Error de estilo/sintaxis (linter)
- ✅ Problema de dependencias
- ✅ Documentados con instrucciones de reproducción

### 5. Documento PDF (APA)

Debe incluir:

- Capturas de pantalla del pipeline en ejecución
- Descripción de pasos automatizados
- Evidencia de errores detectados
- Resolución aplicada
- Recomendaciones y aprendizajes
- Enlace a herramienta de gestión del TIF
- Enlace público al repositorio

## Resolución de Conflictos y Problemas Comunes

### Escenario 1: Merge conflict en el código

**Problema:** Dos integrantes editan el mismo archivo en sus ramas

```
CONFLICT (content): Merge conflict in JS/index.js
```

**Resolución:**

1. Quien abre el PR ve el conflicto en GitHub
2. Descarga la rama con conflicto
3. Resuelve manualmente los conflictos
4. Hace commit de la resolución
5. El CI re-valida automáticamente
6. Una vez resuelto, se puede mergear

### Escenario 2: Linter falla en PR

**Problema:** Código con estilo incorrecto

```
npm ERR! eslint found violations
```

**Resolución:**

1. El CI muestra el error en el log de Actions
2. Se corrige el código localmente
3. Se hace commit y push
4. El CI re-ejecuta automáticamente

### Escenario 3: Test falla en develop

**Problema:** Un test que pasaba localmente falla al mergear

```
Tests: 1 passed, 1 failed (2 total)
```

**Resolución:**

1. Revertir el merge temporalmente
2. Investigar qué cambio lo rompió
3. Actualizar el test o el código según corresponda
4. Volver a mergear

### Escenario 4: Cambios de dependencias

**Problema:** `package.json` cambió, otros integrantes tienen versiones viejas

```
npm ERR! peer dep missing
```

**Resolución:**

1. Después de un pull en develop, correr `npm install` nuevamente
2. Esto descarga las versiones correctas
3. Luego seguir el workflow normal

## Tecnologías por Capa

### Frontend (visible para usuario)

- HTML5 semántico
- CSS3 con variables y animaciones
- JavaScript ES2022 para interactividad

### Build & Deployment

- npm como gestor de dependencias
- GitHub como repositorio
- GitHub Actions para CI/CD

### Desarrollo & Quality

- ESLint para validación de código
- Jest para pruebas unitarias
- Node.js como runtime

## Equipo y Contribuciones

| Nombre          | Rama    | Rol                        |
| --------------- | ------- | -------------------------- |
| Matías Carlsson | matias  | Coordinación, arquitectura |
| Selene          | selene  | Desarrollo features        |
| Emanuel         | emanuel | Desarrollo features        |
| Hannah          | hannah  | Desarrollo features        |

## Links Útiles

- **Repositorio:** https://github.com/MatiasCarlsson/Ingenieria-III
- **Actions/Pipeline:** https://github.com/MatiasCarlsson/Ingenieria-III/actions
- **Issues & PRs:** https://github.com/MatiasCarlsson/Ingenieria-III/pulls
- **Releases:** https://github.com/MatiasCarlsson/Ingenieria-III/releases
- **ESLint Docs:** https://eslint.org
- **Jest Docs:** https://jestjs.io
- **GitHub Actions Docs:** https://docs.github.com/en/actions

## Recomendaciones y Aprendizajes

### ✅ Lo que funcionó bien

1. **CI automatizado temprano** - Detecta problemas inmediatamente
2. **Validación de código** - Linter mantiene consistencia
3. **Ramas por integrante** - Evita conflictos, facilita parallelismo
4. **Pruebas unitarias funcionales** - Valida comportamiento real, no lógica abstracta
5. **Reporte visual en Actions** - Fácil de entender para todo el equipo

### 💡 Mejoras futuras

1. **Aumentar cobertura** - Llegar a 80%+ de coverage
2. **Agregar pruebas de integración** - Más allá de unidades
3. **Deploy automático** - Mergear a main → deploy a hosting
4. **Code review automático** - Análisis de seguridad, duplicación
5. **Notifications** - Alertas en Slack/Discord cuando falla
6. **Semantic versioning** - Tags automáticos con versionado

### 🎓 Conceptos aprendidos

- Gestión de ramas y workflows de Git
- Automatización con CI/CD
- Testing y aseguramiento de calidad
- Artifacts y reportes en Actions
- Colaboración distribuida
- DevOps básico

## Licencia

MIT

---

**Última actualización:** Abril 2026  
**Estado:** Activo - Proyecto de Actividad #8 Ingeniería III
