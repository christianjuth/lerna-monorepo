/* eslint-disable */

import { unsafeCSS } from 'lit';

export type HSLColor = [number, number, number, number?];

// # Relative luminance
//
// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
// https://en.wikipedia.org/wiki/Luminance_(relative)
// https://en.wikipedia.org/wiki/Luminosity_function
// https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients

// red, green, and blue coefficients
const rc = 0.2126;
const gc = 0.7152;
const bc = 0.0722;
// low-gamma adjust coefficient
const lowc = 1 / 12.92;

function adjustGamma(x: number) {
  return Math.pow((x + 0.055) / 1.055, 2.4);
}

type RGBColor = Readonly<[number, number, number]>;

/**
 * Given a 3-element array of R, G, B varying from 0 to 255, return the luminance
 * as a number from 0 to 1.
 * @example
 * const black_lum = relativeLuminance([0, 0, 0]); // 0
 */
function relativeLuminance(rgb: RGBColor) {
  const rsrgb = rgb[0] / 255;
  const gsrgb = rgb[1] / 255;
  const bsrgb = rgb[2] / 255;

  const r = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb);
  const g = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb);
  const b = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);

  return r * rc + g * gc + b * bc;
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb([h, s, l]: HSLColor) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255] as const;
}

function hslToString([h, s, l]: HSLColor) {
  return `${h}, ${s}%, ${Math.round(l)}%`;
}

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(val, min));
}

export function remap(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function remapL(l: number) {
  return [0, 3, 7, 9, 12, 15, 18, 21, 26, 31, 39, 52, 59, 68, 85, 100][l];
}

export function getAdjustedColor([h, s, l, a]: HSLColor): HSLColor {
  const targetL = remapL(l);

  for (let i = 0; i < 25; i++) {
    const relativeL = relativeLuminance(hslToRgb([h, s, l])) * 100;
    const delta = targetL - relativeL;
    l += delta / 2;
    l = clamp(0, l, 100);
  }

  return [h, s, l, a];
}

function varName(...parts: (string | number | undefined)[]) {
  parts = parts.filter(v => (v ?? false) !== false);
  return `--${parts.join('-')}`;
}

export declare namespace Theme {
  type ColorName = 'primary' | 'accent1' | 'gray';

  type ColorFn = (parmas: { l: number; shade: number }) => HSLColor;

  type Config = Record<ColorName, ColorFn>;
}

const SHADES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;
const SHADE_STOPS = SHADES.length;

export function generatePallet(color: Theme.ColorName, fn: Theme.ColorFn) {
  let vars: Record<string, string | number> = {};

  const inverted = fn({ l: 100, shade: 0 })[2] < 50; // check if luminance starts low

  vars[varName(color, 'inverted', 'bit')] = inverted ? 1 : 0;

  for (let shade = 0; shade < SHADE_STOPS; shade++) {
    const lightness = remap(shade, SHADE_STOPS - 1, 0, 0, 100);
    let [h, s, l] = fn({ l: lightness, shade });
    l = Math.round(remap(l, 0, 100, 0, SHADE_STOPS - 1));
    const adjusted = getAdjustedColor([h, s, l]);

    vars[varName(color, shade)] = hslToString(adjusted);
  }
  return vars;
}

const WHITE = '#FFF';

function color(
  color: Theme.ColorName,
  shade: number,
  modifier:
    | 'text'
    | 'transparent-overlay-1'
    | 'transparent-overlay-2'
    | number = 1
) {
  if (modifier === 'text') {
    const invertedBit = `var(${varName(color, 'inverted', 'bit')})`;
    if (shade < 6) {
      return unsafeCSS(`hsl(0, 0%, calc(${invertedBit} * 100%))`);
    } else if (shade > 10) {
      return unsafeCSS(`hsl(0, 0%, calc((1 - ${invertedBit}) * 100%))`);
    } else {
      return unsafeCSS(WHITE);
    }
  }

  if (modifier === 'transparent-overlay-1') {
    const invertedBit = `var(${varName(color, 'inverted', 'bit')})`;
    const transparency = (high: boolean) =>
      high
        ? `calc(0.1 + (${invertedBit} / 10))`
        : `calc(0.1 + ((1 - ${invertedBit}) / 10))`;
    if (shade < 6) {
      return unsafeCSS(
        `hsla(0, 0%, calc(${invertedBit} * 100%), ${transparency(true)})`
      );
    } else if (shade > 10) {
      return unsafeCSS(`hsla(0, 0%, calc((1 - ${invertedBit}) * 100%), 0.1)`);
    } else {
      return unsafeCSS(`hsla(0, 0%, 100%, ${transparency(false)})`);
    }
  }

  if (modifier === 'transparent-overlay-2') {
    const invertedBit = `var(${varName(color, 'inverted', 'bit')})`;
    const transparency = (high: boolean) =>
      high
        ? `calc(0.15 + (${invertedBit} / 10))`
        : `calc(0.1 + ((1 - ${invertedBit}) / 10))`;
    if (shade < 6) {
      return unsafeCSS(
        `hsla(0, 0%, calc(${invertedBit} * 100%), ${transparency(true)})`
      );
    } else if (shade > 10) {
      return unsafeCSS(`hsla(0, 0%, calc((1 - ${invertedBit}) * 100%), 0.15)`);
    } else {
      return unsafeCSS(`hsla(0, 0%, 100%, ${transparency(false)})`);
    }
  }

  return unsafeCSS(`hsla(var(${varName(color, shade)}), ${modifier * 100}%)`);
}

export const VARIABLE_NAMES = {
  DARK_MODE_BIT: '--dark-mode-bit',
  ROUNDNESS: '--roundness',
  BUTTON_FONT_STYLE: '--button-font-style',
  BUTTON_DEFAULT_VARIANT: '--button-default-variant',
  MAIN_GUTTERS_BASE_WIDTH: '--main-gutters-baseWidth',
};

const roundness = (...multipliers: number[]) => {
  const out = multipliers
    .map(multiplier => {
      return `calc(var(${VARIABLE_NAMES.ROUNDNESS}) * ${multiplier}px)`;
    })
    .join(' ');
  return unsafeCSS(out);
};

const colorPresets = {
  text: color('gray', 15),
  textMuted: color('gray', 8),
  background: color('gray', 0),
  border: color('gray', 2),
};

const spacing = (...multipliers: number[]) => {
  return multipliers
    .map(multiplier => {
      return multiplier * 5 + 'px';
    })
    .join(' ');
};

export const theme = {
  color,
  roundness,
  colorPresets,
  spacing,
};
