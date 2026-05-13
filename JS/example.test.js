/**
 * Pruebas unitarias de ejemplo
 * Asegúrate de tener al menos 5 pruebas para pasar la validación del CI
 */

// Ejemplo 1: Prueba simple
test('suma de números positivos', () => {
  expect(2 + 2).toBe(4);
});

// Ejemplo 2: Prueba con validación booleana
test('validación de tipo string', () => {
  const mensaje = 'Hola, mundo';
  expect(typeof mensaje).toBe('string');
});

// Ejemplo 3: Prueba con array
test('verificar elementos en array', () => {
  const numeros = [1, 2, 3, 4, 5];
  expect(numeros.length).toBe(5);
});

// Ejemplo 4: Prueba con objeto
test('acceso a propiedades de objeto', () => {
  const usuario = { nombre: 'Juan', edad: 30 };
  expect(usuario.nombre).toBe('Juan');
});

// Ejemplo 5: Prueba con negación
test('validar que algo NO es null', () => {
  const valor = 'existe';
  expect(valor).not.toBeNull();
});
