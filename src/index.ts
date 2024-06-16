import applyColor, { Color, Background, Bg } from './color.default';

type ColorType = keyof typeof Color;
type BackgroundType = keyof typeof Background;

function createBackgroundMethods(color: ColorType) {
    const backgroundMethods: { [key in BackgroundType]?: () => string } = {};
    Object.keys(Bg).forEach((bgMethod) => {
        const methodName = bgMethod as keyof typeof Bg;
        const backgroundKey = methodName.replace('Bg', '') as keyof typeof Background;
        backgroundMethods[backgroundKey] = () => applyColor(color, '', [], backgroundKey);
    });
    return backgroundMethods;
}

export const colorize: { [key in ColorType]: { [key in BackgroundType]?: () => string } & { (text?: string, background?: BackgroundType): string } } = {} as any;

for (const color of Object.keys(Color)) {
    colorize[color as ColorType] = Object.assign(
        (text: string = '', background?: BackgroundType) => applyColor(color as ColorType, text, [], background),
        createBackgroundMethods(color as ColorType)
    );
}