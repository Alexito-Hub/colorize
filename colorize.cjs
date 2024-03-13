const { applyColor } = require('./colors/colors.cjs');

const colorize = {
    black: (text, background) => applyColor('black', text, [], background),
    red: (text, background) => applyColor('red', text, [], background),
    green: (text, background) => applyColor('green', text, [], background),
    yellow: (text, background) => applyColor('yellow', text, [], background),
    blue: (text, background) => applyColor('blue', text, [], background),
    magenta: (text, background) => applyColor('magenta', text, [], background),
    cyan: (text, background) => applyColor('cyan', text, [], background),
    white: (text, background) => applyColor('white', text, [], background),
    gray: (text, background) => applyColor('gray', text, [], background),
    brightRed: (text, background) => applyColor('brightRed', text, [], background),
    brightGreen: (text, background) => applyColor('brightGreen', text, [], background),
    brightYellow: (text, background) => applyColor('brightYellow', text, [], background),
    brightBlue: (text, background) => applyColor('brightBlue', text, [], background),
    brightMagenta: (text, background) => applyColor('brightMagenta', text, [], background),
    brightCyan: (text, background) => applyColor('brightCyan', text, [], background),
    brightWhite: (text, background) => applyColor('brightWhite', text, [], background),
    custom: (text, r, g, b, background, a = 1) => applyColor('custom', text, [r, g, b, a], background),
    rgb: (text, r, g, b, background, a = 1) => applyColor('rgb', text, [r, g, b, a], background),
    bold: (text, background) => applyColor('bold', text, [], background),
    italic: (text, background) => applyColor('italic', text, [], background),
    underline: (text, background) => applyColor('underline', text, [], background),
    inverse: (text, background) => applyColor('inverse', text, [], background),
    strike: (text, background) => applyColor('strike', text, [], background),
};

module.exports = colorize;