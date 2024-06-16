export enum Color {
    Black = '\x1b[30m',
    Red = '\x1b[31m',
    Green = '\x1b[32m',
    Yellow = '\x1b[33m',
    Blue = '\x1b[34m',
    Magenta = '\x1b[35m',
    Cyan = '\x1b[36m',
    White = '\x1b[37m',
    Gray = '\x1b[90m',
    BrightRed = '\x1b[91m',
    BrightGreen = '\x1b[92m',
    BrightYellow = '\x1b[93m',
    BrightBlue = '\x1b[94m',
    BrightMagenta = '\x1b[95m',
    BrightCyan = '\x1b[96m',
    BrightWhite = '\x1b[97m',
    Custom = 'custom',
    Rgb = 'rgb',
    Bold = '\x1b[1m',
    Italic = '\x1b[3m',
    Underline = '\x1b[4m',
    Inverse = '\x1b[7m',
    Strike = '\x1b[9m'
}

export enum Background {
    Black = '\x1b[40m',
    Red = '\x1b[41m',
    Green = '\x1b[42m',
    Yellow = '\x1b[43m',
    Blue = '\x1b[44m',
    Magenta = '\x1b[45m',
    Cyan = '\x1b[46m',
    White = '\x1b[47m',
    Gray = '\x1b[100m',
    BrightRed = '\x1b[101m',
    BrightGreen = '\x1b[102m',
    BrightYellow = '\x1b[103m',
    BrightBlue = '\x1b[104m',
    BrightMagenta = '\x1b[105m',
    BrightCyan = '\x1b[106m',
    BrightWhite = '\x1b[107m',
    Custom = 'custom',
    Rgb = 'rgb'
}

export const Bg = {
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m',
    BgGray: '\x1b[100m',
    BgBrightRed: '\x1b[101m',
    BgBrightGreen: '\x1b[102m',
    BgBrightYellow: '\x1b[103m',
    BgBrightBlue: '\x1b[104m',
    BgBrightMagenta: '\x1b[105m',
    BgBrightCyan: '\x1b[106m',
    BgBrightWhite: '\x1b[107m',
}

type ColorKey = keyof typeof Color;
type BackgroundKey = keyof typeof Background;

function validateRgb(r: number, g: number, b: number): boolean {
    return [r, g, b].every((value) => value >= 0 && value <= 255);
}

function applyColor(
    color: ColorKey = 'Black',
    text: string,
    args: number[] = [],
    background: BackgroundKey = 'Black'
): string {
    if ((color === 'Custom' || color === 'Rgb') && !validateRgb(args[0], args[1], args[2])) {
        throw new Error('Invalid RGB values. Each value must be between 0 and 255.');
    }
    const colors: { [key in ColorKey]: string | Function } = {
        ...Object.keys(Color).reduce((acc, key) => {
            acc[key as ColorKey] = Color[key as ColorKey];
            return acc;
        }, {} as { [key in ColorKey]: string | Function }),
        Custom: (r: number, g: number, b: number, a: number = 1) => `\x1b[38;2;${r};${g};${b};${a}m`,
        Rgb: (r: number, g: number, b: number, a: number = 1) => `\x1b[38;2;${r};${g};${b};${a}m`
    };
    
    const backgrounds: { [key in BackgroundKey]: string | Function } = {
        ...Object.keys(Background).reduce((acc, key) => {
            acc[key as BackgroundKey] = Background[key as BackgroundKey];
            return acc;
        }, {} as { [key in BackgroundKey]: string | Function }),
        Custom: (r: number, g: number, b: number, a: number = 1) => `\x1b[48;2;${r};${g};${b};${a}m`,
        Rgb: (r: number, g: number, b: number, a: number = 1) => `\x1b[48;2;${r};${g};${b};${a}m`
    };
    
    const reset = '\x1b[0m';
    
    if (!colors[color] && color !== 'Custom' && color !== 'Rgb') {
        throw new Error(`Color '${color}' not supported`);
    }

    const colorCode = typeof colors[color] === 'function' ? '' : colors[color];
    const backgroundCode = typeof backgrounds[background] === 'function' ? '' : backgrounds[background];
    if (color === 'Custom' || color === 'Rgb') {
        const [r, g, b, a = 1] = args;
        const colorFunction = colors[color] as Function;
        return `${colorFunction(r, g, b, a)}${backgroundCode}${text}${reset}`;
    } else {
        return `${colorCode}${backgroundCode}${text}${reset}`;
    }
}

export default applyColor;