# Instrucciones para Colaboradores

## 📖 Flujo de Trabajo Recomendado

### 1. Clonar el Repositorio

```bash
git clone https://github.com/MatiasCarlsson/Ingenier-a-III.git
cd Ingenier-a-III
```

### 2. Crear una Rama de Desarrollo Personal

```bash
git checkout -b feature/nombre-de-tu-feature develop
```

### 3. Instalar Dependencias Localmente

```bash
npm install
```

### 4. Realizar Cambios y Tests

Antes de hacer commit:

```bash
# Ejecutar tests localmente
npm test

# Ejecutar linter
npm run lint

# Corregir errores de estilo
npm run lint:fix
```

### 5. Commit y Push

```bash
git add .
git commit -m "feat: descripcion de los cambios"
git push origin feature/nombre-de-tu-feature
```

### 6. Crear Pull Request

- Ir a GitHub
- Crear PR desde tu rama feature hacia `develop`
- Esperar a que el CI/CD valide (el pipeline debe pasar ✅)
- Solicitar revisión de código

### 7. Resolver Conflictos (si es necesario)

```bash
# Si hay conflictos, actualizarse desde develop
git fetch origin
git merge origin/develop
# Resolver conflictos manualmente
git add .
git commit -m "fix: resolver conflictos"
git push origin feature/nombre-de-tu-feature
```

---

## ✅ Checklist Antes de Push

- [ ] Ejecuté `npm test` y todos los tests pasan
- [ ] Ejecuté `npm run lint` sin errores
- [ ] Mi código sigue el estilo del proyecto
- [ ] Añadí tests para nuevas funcionalidades
- [ ] Actualicé la documentación si es necesario
- [ ] Mi rama está actualizada con la última versión de `develop`

---

## 🔄 Ramas del Proyecto

| Rama        | Propósito                                          |
| ----------- | -------------------------------------------------- |
| `main`      | Código en producción - Solo merges desde `develop` |
| `develop`   | Integración de features - Base para PRs            |
| `feature/*` | Desarrollo de nuevas funcionalidades               |
| `bugfix/*`  | Corrección de bugs                                 |
| `hotfix/*`  | Parches urgentes en producción                     |

---

## 📚 Estándares de Código

### Nombres de Variables

```javascript
// ❌ Evitar
const x = 5;
const c1 = "test";

// ✅ Preferir
const contador = 5;
const nombreUsuario = "test";
```

### Nombres de Funciones

```javascript
// ❌ Evitar
function calc(a, b) {}

// ✅ Preferir
function calcularPromedio(numeros) {}
```

### Comentarios

```javascript
// ✅ Documentación clara
/**
 * Calcula el promedio de un array de números
 * @param {number[]} numeros - Array de números
 * @returns {number} El promedio calculado
 * @throws {Error} Si el array está vacío
 */
function promedio(numeros) {
  // implementación
}
```

---

## 🆘 Contacto y Ayuda

Para preguntas o problemas:

1. Revisar [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Abrir un issue en GitHub
3. Contactar con los mantenedores del proyecto

---

**Última actualización:** 2026-04-23
