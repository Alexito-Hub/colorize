import Coloring from './utils';
import { Color, Background, Bg } from './enums'

type ColorType = keyof typeof Color;
type BackgroundType = keyof typeof Background;

function create(color: ColorType) {
    const methods: { [key in BackgroundType]?: () => string } = {};
    Object.keys(Bg).forEach((bg) => {
        const name = bg as keyof typeof Bg;
        const key = name.replace('Bg', '') as keyof typeof Background;
        methods[key] = () => applyColor(color, '', [], key);
    });
    return methods;
}

export const colorize: { [key in ColorType]: { [key in BackgroundType]?: () => string } & { (text?: string, background?: BackgroundType): string } } = {} as any;

for (const color of Object.keys(Color)) {
    colorize[color as ColorType] = Object.assign(
        (text: string = '', background?: BackgroundType) => applyColor(color as ColorType, text, [], background),
        create(color as ColorType)
    )
}