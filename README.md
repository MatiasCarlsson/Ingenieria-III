# Ingeniería III - Actividad #8: Integración Continua

## 📋 Descripción del Proyecto

Este proyecto implementa una solución completa de **Integración Continua (CI/CD)** utilizando **GitHub Actions**, cumpliendo con los requisitos de la Actividad #8 de Ingeniería III.

### Objetivo

Comprender los conceptos asociados con la gestión de la configuración e integración continua, y utilizar herramientas que permitan la automatización de los procesos asociados con la gestión de la configuración e integración continua.

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18.x o superior
- npm (incluido con Node.js)
- Git

### Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/MatiasCarlsson/Ingenier-a-III.git

# Acceder al directorio del proyecto
cd Ingenier-a-III

# Instalar dependencias
npm install
```

### Ejecutar el Proyecto

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar linter (verificar estándares de código)
npm run lint

# Corregir automáticamente errores de estilo
npm run lint:fix

# Compilar el proyecto
npm run build

# Iniciar la aplicación
npm start
```

---

## 🔄 Configuración de Integración Continua

### Archivo de Configuración del Pipeline

La configuración del CI está disponible en: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

### Estructura del Pipeline CI/CD

El pipeline de CI/CD está configurado para ejecutarse automáticamente cuando:

- Se realiza un **push** a las ramas `main` o `develop`
- Se crea o actualiza un **pull request** hacia `main` o `develop`

### Pasos Automatizados

#### 1️⃣ **Checkout del Código**

```yaml
- name: Checkout code
  uses: actions/checkout@v3
```

Obtiene el código del repositorio en el runner de GitHub Actions.

#### 2️⃣ **Configuración de Node.js**

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: ${{ matrix.node-version }}
    cache: "npm"
```

Configura Node.js en versiones 18.x y 20.x (estrategia de matriz para probar múltiples versiones).

#### 3️⃣ **Instalación de Dependencias**

```yaml
- name: Install dependencies
  run: npm ci
```

Instala las dependencias del proyecto de manera reproducible.

#### 4️⃣ **Validación de Estilo de Código (ESLint)**

```yaml
- name: Run ESLint
  run: npm run lint
  continue-on-error: false
```

Ejecuta ESLint para verificar que el código cumple con los estándares de estilo definidos.

#### 5️⃣ **Ejecución de Tests Unitarios**

```yaml
- name: Run unit tests
  run: npm test
  continue-on-error: false
```

Ejecuta las pruebas unitarias con cobertura de código usando Jest.

#### 6️⃣ **Generación de Informes**

```yaml
- name: Upload coverage reports
  uses: actions/upload-artifact@v3
```

Genera y carga informes de cobertura de tests.

---

## 🧪 Pruebas Unitarias

El proyecto incluye **más de 5 pruebas unitarias** en el módulo de matemáticas:

### Ubicación de Tests

- Archivo: [`JS/math.test.js`](JS/math.test.js)
- Módulo probado: [`JS/math.js`](JS/math.js)

### Tests Implementados

| #          | Descripción                                           | Estado  |
| ---------- | ----------------------------------------------------- | ------- |
| **Test 1** | `suma()` - Suma dos números correctamente             | ✅ PASS |
| **Test 2** | `resta()` - Resta dos números correctamente           | ✅ PASS |
| **Test 3** | `multiplica()` - Multiplica dos números correctamente | ✅ PASS |
| **Test 4** | `divide()` - Divide dos números correctamente         | ✅ PASS |
| **Test 5** | `promedio()` - Calcula el promedio de un array        | ✅ PASS |
| **Test 6** | Validación de tipos de datos                          | ✅ PASS |
| **Test 7** | Manejo de errores (división por cero)                 | ✅ PASS |
| **Test 8** | Casos extremos (arrays vacíos, valores negativos)     | ✅ PASS |

### Ejecutar Tests Localmente

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con cobertura
npm test -- --coverage

# Ejecutar un archivo de test específico
npm test math.test.js

# Ejecutar en modo observador
npm test -- --watch
```

---

## 🔍 Validación de Estándares de Código

### Configuración de ESLint

Ubicación: [`.eslintrc.json`](.eslintrc.json)

### Reglas Configuradas

- **Indentación**: 2 espacios
- **Comillas**: Comillas dobles
- **Punto y coma**: Obligatorio
- **Variables no usadas**: Genera error
- **Igualdad**: Estricta (`===`)
- **Llaves**: Obligatorias

### Ejecutar Linter

```bash
# Verificar errores de estilo
npm run lint

# Corregir automáticamente
npm run lint:fix
```

---

## 📊 Simulación de Conflictos y Errores

### Escenario 1: Error de Sintaxis (Linter)

**Problema Detectado:**

```javascript
// ❌ Código incorrecto
function suma(a, b) {
  return a + b; // Falta punto y coma
}
```

**Error del Linter:**

```
Error: Missing semicolon (semi)
Error: Expected 2 spaces but found 0 (indent)
```

**Resolución:**

```bash
npm run lint:fix  # Corrige automáticamente
```

**Código Corregido:**

```javascript
// ✅ Código correcto
function suma(a, b) {
  return a + b;
}
```

---

### Escenario 2: Test Fallido tras Fusión de Ramas

**Problema Detectado:**
Un test falla cuando se fusiona una rama que introduce un cambio incompatible.

```javascript
// ❌ Código que causa fallo en test
function suma(a, b) {
  return a + b + 1; // Error lógico
}

// Test que falla
test("debe sumar correctamente", () => {
  expect(suma(5, 3)).toBe(8); // ❌ FAIL: Expected 8, got 9
});
```

**Log del CI/CD:**

```
FAIL  JS/math.test.js
  ● Test 1: Función suma() › debe sumar correctamente

    Expected: 8
    Received: 9
```

**Resolución:**

```javascript
// ✅ Código corregido
function suma(a, b) {
  return a + b;  // Sin la suma adicional
}

// Resultado
PASS  JS/math.test.js ✓ All tests passed
```

---

### Escenario 3: Error de Dependencias

**Problema Detectado:**
Una dependencia no está disponible o hay incompatibilidad de versiones.

**Log del CI/CD:**

```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/non-existent-package
npm ERR! 404 This package name is not valid
```

**Resolución:**

```bash
# Actualizar package.json con dependencias válidas
npm install nombre-paquete-valido

# Regenerar package-lock.json
npm ci
```

---

## 📈 Flujo de Trabajo Recomendado

### 1. **Desarrollo en Rama Feature**

```bash
git checkout -b feature/nueva-funcionalidad
# Realizar cambios...
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 2. **Crear Pull Request**

- Ir a GitHub y crear un PR hacia `develop`
- El pipeline CI/CD se ejecuta automáticamente

### 3. **Revisión de Resultados**

- ✅ Si el pipeline pasa: proceder a revisión de código
- ❌ Si el pipeline falla: corregir errores y hacer push nuevamente

### 4. **Fusión a Develop**

```bash
git checkout develop
git merge feature/nueva-funcionalidad
git push origin develop
```

### 5. **Release a Main**

```bash
git checkout main
git merge develop
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
```

---

## 📊 Monitoreo del Pipeline

### Ver Estado de Builds

1. Ir a: **https://github.com/MatiasCarlsson/Ingenier-a-III/actions**
2. Seleccionar el workflow `CI/CD Pipeline`
3. Ver detalles de cada ejecución

### Artefactos Generados

- 📄 **Coverage Reports**: Informes de cobertura de tests
- 📋 **CI Reports**: Reportes del estado del pipeline
- 🧪 **Test Results**: Resultados de pruebas en formato JUnit

---

## 🎯 Mejores Prácticas Aplicadas

✅ **Automatización Completa**: Tests, linting y builds se ejecutan automáticamente
✅ **Matrix Strategy**: Pruebas en múltiples versiones de Node.js
✅ **Fail Fast**: El pipeline se detiene en el primer error
✅ **Artefactos**: Generación automática de reportes
✅ **Documentación**: README completo y configuración clara

---

## 📚 Aprendizajes y Recomendaciones

### Beneficios de CI/CD

1. **Detección Temprana de Errores**: Los problemas se detectan antes de producción
2. **Automatización de Procesos**: Reduce la necesidad de validación manual
3. **Confianza en el Código**: Cada cambio es validado automáticamente
4. **Velocidad de Desarrollo**: Feedback rápido para el equipo

### Recomendaciones

- ✅ Escribir tests para todas las funciones críticas
- ✅ Mantener un código limpio siguiendo estándares de estilo
- ✅ Realizar commits pequeños y frecuentes
- ✅ Escribir mensajes de commit descriptivos
- ✅ Revisar los logs del CI/CD regularmente

---

## 🔗 Enlaces Importantes

- 📁 **Repositorio**: https://github.com/MatiasCarlsson/Ingenier-a-III
- ⚙️ **Workflow CI/CD**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
- 🧪 **Tests**: [`JS/math.test.js`](JS/math.test.js)
- 📋 **Linter Config**: [`.eslintrc.json`](.eslintrc.json)
- 🏗️ **Jest Config**: [`jest.config.js`](jest.config.js)

---

## 👥 Equipo de Trabajo

**Integrantes:** [Agregar nombres de integrantes]

**Rama Principal**: `main`
**Rama de Desarrollo**: `develop`

---

## 📝 Historial de Cambios

| Versión | Fecha      | Descripción                                        |
| ------- | ---------- | -------------------------------------------------- |
| 1.0.0   | 2026-04-23 | Implementación inicial de CI/CD con GitHub Actions |

---

## ⚖️ Licencia

MIT

---

**Documento generado para:** Actividad #8 - Integración Continua
**Institución:** Ingeniería III
**Año:** 2026
