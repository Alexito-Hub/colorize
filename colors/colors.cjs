function applyColor(color = '', text, args = [], background = '') {
    const colors = {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        gray: '\x1b[90m',
        brightRed: '\x1b[91m',
        brightGreen: '\x1b[92m',
        brightYellow: '\x1b[93m',
        brightBlue: '\x1b[94m',
        brightMagenta: '\x1b[95m',
        brightCyan: '\x1b[96m',
        brightWhite: '\x1b[97m',
        custom: (r, g, b, a = 1) => `\x1b[38;2;${r};${g};${b};${a}m`,
        rgb: (r, g, b, a = 1) => `\x1b[38;2;${r};${g};${b};${a}m`,
        bold: '\x1b[1m', 
        italic: '\x1b[3m',
        underline: '\x1b[4m',
        inverse: '\x1b[7m',
        strike: '\x1b[9m'
    };

    const backgrounds = {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m',
        gray: '\x1b[100m',
        brightRed: '\x1b[101m',
        brightGreen: '\x1b[102m',
        brightYellow: '\x1b[103m',
        brightBlue: '\x1b[104m',
        brightMagenta: '\x1b[105m',
        brightCyan: '\x1b[106m',
        brightWhite: '\x1b[107m',
        custom: (r, g, b, a = 1) => `\x1b[48;2;${r};${g};${b};${a}m`,
        rgb: (r, g, b, a = 1) => `\x1b[48;2;${r};${g};${b};${a}m`,
    };

    const reset = '\x1b[0m';

    if (!colors[color] && color !== 'custom' && color !== 'rgb') {
        throw new Error(`Color '${color}' not supported`);
    }

    const colorCode = colors[color] || '';
    const backgroundCode = backgrounds[background] || '';

    if (color === 'custom') {
        const r = args[0];
        const g = args[1];
        const b = args[2];
        const a = args[3] || 1;
        return `${colors.custom(r, g, b, a)}${backgroundCode}${text}${reset}`;
    } else if (color === 'rgb') {
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
