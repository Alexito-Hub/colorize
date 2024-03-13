const colors = require('./colors.json');

function applyColor(color = '', text, args = [], background = '') {
    const reset = '\x1b[0m'; // Restablecer los estilos

    if (!colors.text[color] && color !== 'custom' && color !== 'rgb') {
        throw new Error(`Color '${color}' not supported`);
    }

    const colorCode = colors.text[color] || '';
    const backgroundCode = colors.background[background] || '';

    if (color === 'custom') {
        if (args.length < 3) {
            throw new Error('Custom color requires at least three arguments (r, g, b)');
        }
        const r = args[0];
        const g = args[1];
        const b = args[2];
        const a = args[3] || 1;
        return `${colors.custom(r, g, b, a)}${backgroundCode}${text}${reset}`;
    } else if (color === 'rgb') {
        if (args.length < 3) {
            throw new Error('RGB color requires at least three arguments (r, g, b)');
        }
        const r = args[0];
        const g = args[1];
        const b = args[2];
        const a = args[3] || 1;
        return `${colors.rgb(r, g, b, a)}${backgroundCode}${text}${reset}`;
    } else {
        return `${colorCode}${backgroundCode}${text}${reset}`;
    }
}

module.exports = { applyColor };
