# Documentación de CI/CD - Guía de Resolución de Problemas

## 📋 Errores Comunes y Soluciones

### 1. Error: "npm: command not found"

**Síntoma:**

```
Error: npm: command not found
```

**Causa:** Node.js o npm no está instalado en el sistema.

**Solución:**

```bash
# Descargar e instalar Node.js desde https://nodejs.org
# Verificar instalación
node --version
npm --version
```

---

### 2. Error: "Test Failures - Expected 8 but received 9"

**Síntoma:**

```
FAIL  JS/math.test.js
  ● Test 1: Función suma() › debe sumar correctamente
    Expected: 8
    Received: 9
```

**Causa:** Cambio lógico en el código que rompe un test.

**Solución:**

```javascript
// ❌ Código incorrecto en math.js
function suma(a, b) {
  return a + b + 1;  // Error: suma adicional
}

// ✅ Código correcto
function suma(a, b) {
  return a + b;  // Sin la suma adicional
}

// Ejecutar tests nuevamente
npm test
```

---

### 3. Error: "ESLint - Missing semicolon"

**Síntoma:**

```
JS/math.js
  10:5  error  Missing semicolon  semi
  20:8  error  Expected 2 spaces but found 0  indent
```

**Causa:** El código no sigue los estándares de estilo definidos.

**Solución:**

```bash
# Opción 1: Corregir automáticamente
npm run lint:fix

# Opción 2: Corrección manual
# Agregar puntos y coma faltantes
# Ajustar indentación a 2 espacios
```

---

### 4. Error: "Division by Zero"

**Síntoma:**

```
FAIL  JS/math.test.js
  ● Test 4: Función divide() › debe lanzar error al dividir por cero
    Expected error to be thrown
    But no error was thrown
```

**Causa:** La función no valida la división por cero.

**Solución:**

```javascript
// ❌ Código incorrecto
function divide(a, b) {
  return a / b; // No valida b === 0
}

// ✅ Código correcto
function divide(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir por cero");
  }
  return a / b;
}
```

---

### 5. Error: "Dependencies not installed"

**Síntoma:**

```
npm ERR! Cannot find module 'jest'
npm ERR! Cannot find module 'eslint'
```

**Causa:** Las dependencias no están instaladas.

**Solución:**

```bash
# Instalar todas las dependencias
npm install

# O usar npm ci para instalación reproducible
npm ci
```

---

## 🔍 Verificación Local Antes de Push

Antes de hacer push, ejecuta estos comandos localmente:

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar linter
npm run lint

# 3. Ejecutar tests
npm test

# 4. Compilar el proyecto
npm run build
```

Si todos estos comandos se ejecutan sin errores, tu PR pasará el pipeline CI/CD.

---

## 📊 Archivos de Configuración

### package.json

Define scripts para tests, linting y build. Ubicación: [`package.json`](../package.json)

### .eslintrc.json

Configuración de ESLint para estándares de código. Ubicación: [`.eslintrc.json`](../.eslintrc.json)

### jest.config.js

Configuración de Jest para tests unitarios. Ubicación: [`jest.config.js`](../jest.config.js)

### .babelrc

Configuración de Babel para compilación de código. Ubicación: [`.babelrc`](../.babelrc)

### .github/workflows/ci.yml

Workflow de GitHub Actions. Ubicación: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

---

## 🚀 Comandos Útiles

| Comando            | Descripción                                |
| ------------------ | ------------------------------------------ |
| `npm install`      | Instalar dependencias                      |
| `npm test`         | Ejecutar tests unitarios                   |
| `npm run lint`     | Verificar estándares de código             |
| `npm run lint:fix` | Corregir automáticamente errores de estilo |
| `npm run build`    | Compilar el proyecto                       |
| `npm start`        | Iniciar la aplicación                      |

---

## 📈 Monitoreo del Pipeline

1. Acceder a: https://github.com/MatiasCarlsson/Ingenier-a-III/actions
2. Seleccionar el workflow `CI/CD Pipeline`
3. Ver detalles de cada ejecución
4. Revisar logs si hay fallos

---

**Última actualización:** 2026-04-23
