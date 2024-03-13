# Librería de Colores para Consola

Esta librería proporciona una manera fácil de aplicar colores y estilos al texto en la consola de Node.js.

## Instalación

Para instalar la librería, puedes usar npm o yarn:

```bash
npm install --save colorize-console
```

o

```bash
yarn add colorize-console
```

## Uso

Para utilizar la librería, primero debes importar el módulo `colorize`:

```javascript
const colorize = require('colorize-console');
```

### Colores de Texto

Puedes aplicar colores a tu texto utilizando los métodos disponibles en `colorize`:

- `black(text)`
- `red(text)`
- `green(text)`
- `yellow(text)`
- `blue(text)`
- `magenta(text)`
- `cyan(text)`
- `white(text)`
- `gray(text)`
- `brightRed(text)`
- `brightGreen(text)`
- `brightYellow(text)`
- `brightBlue(text)`
- `brightMagenta(text)`
- `brightCyan(text)`
- `brightWhite(text)`

Ejemplo:

```javascript
console.log(colorize.red('Este texto es rojo'));
```

### Colores de Fondo

También puedes especificar un color de fondo para el texto utilizando el segundo parámetro en los métodos anteriores:

- `black(text, background)`
- `red(text, background)`
- `green(text, background)`
- `yellow(text, background)`
- `blue(text, background)`
- `magenta(text, background)`
- `cyan(text, background)`
- `white(text, background)`
- `gray(text, background)`
- `brightRed(text, background)`
- `brightGreen(text, background)`
- `brightYellow(text, background)`
- `brightBlue(text, background)`
- `brightMagenta(text, background)`
- `brightCyan(text, background)`
- `brightWhite(text, background)`

Ejemplo:

```javascript
console.log(colorize.red('Texto en rojo con fondo blanco', 'white'));
```

### Estilos

Además de colores, puedes aplicar diferentes estilos al texto:

- `bold(text)`
- `italic(text)`
- `underline(text)`
- `inverse(text)`
- `strike(text)`

Ejemplo:

```javascript
console.log(colorize.bold('Texto en negrita'));
```

### Colores Personalizados

También puedes especificar colores personalizados utilizando RGB. Esto requiere los métodos `custom` y `rgb`:

- `custom(text, r, g, b, background, a = 1)`
- `rgb(text, r, g, b, background, a = 1)`

Ejemplo:

```javascript
console.log(colorize.custom('Texto con color personalizado', 255, 0, 0)); // Rojo
console.log(colorize.rgb('Texto con color RGB', 0, 255, 0)); // Verde
```