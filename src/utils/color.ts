import { Color, Background } from '../enums'

type ColorKey = keyof typeof Color;
type BackgroundKey = keyof typeof Background;

function validate(r: number, g: number, b: number): boolean {
    return [r, g, b].every((value) => value >= 0 && value <= 255);
}

export default function Coloring(color: ColorKey = 'Black', text: string, args: number[] = [], background: BackgroundKey = 'Black'): string {
    if ((color === 'Custom' || color === 'Rgb') && !validate(args[0], args[1], args[2])) {
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
        const colore = colors[color] as Function;
        return `${colore(r, g, b, a)}${backgroundCode}${text}${reset}`;
    } else {
        return `${colorCode}${backgroundCode}${text}${reset}`;
    }
}