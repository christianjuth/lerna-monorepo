import { v4 as uuid } from "uuid";
import { useState, useEffect, useMemo, useRef } from "react";
import { HSLColor } from "./types";

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(val, min));
}

/**
 * Converts CSS number in px to rem.
 *
 * This assumes that the standard base font size
 * of 16px has not been tampered with.
 */
export const pxToRem = (...pxs: number[]) => {
  return pxs.map((px) => `${px / 16}rem`).join(" ");
};

export function useComponentId(prefix: string) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(uuid());
  }, []);

  return `${prefix}-${id}`;
}

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

export function remap(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

type StyleConfig = string | undefined | Record<string, boolean | undefined>;

export function cn(...styles: StyleConfig[]) {
  const out: string[] = [];

  for (const style of styles) {
    if (typeof style === "string") {
      out.push(style);
    } else if (style) {
      Object.entries(style).forEach(([className, active]) => {
        if (className && active) {
          out.push(className);
        }
      });
    }
  }

  return out.join(" ");
}

export function debounce(func: () => any, wait = 10, immediate = false) {
  let timeout: number | undefined;

  return function executedFunction() {
    let later = function () {
      timeout = undefined;
      if (!immediate) func();
    };

    let callNow = immediate && !timeout;

    window.clearTimeout(timeout);

    timeout = window.setTimeout(later, wait);

    if (callNow) func();
  };
}

export function useDebouncedCallback(fn: () => any, deps: any[]) {
  const unmoutedRef = useRef(false)

  useEffect(() => {
    return () => {
      unmoutedRef.current = true
    }
  }, [])

  const debounced = useMemo(
    () => {
      return debounce(() => {
        if (!unmoutedRef.current) {
          fn()
        }
      })
    },
    [deps]
  )

  return debounced
}