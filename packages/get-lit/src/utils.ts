import { unsafeCSS } from 'lit';

/**
 * Converts CSS number in px to rem.
 *
 * This assumes that the standard base font size
 * of 16px has not been tampered with.
 */
export const pxToRem = (...pxs: number[]) =>
  unsafeCSS(pxs.map(px => `${px / 16}rem`).join(' '));

export function uuid() {
  const randomString = () => (Math.random() + 1).toString(36).substring(2);

  return [randomString(), randomString(), randomString(), randomString()].join(
    '-'
  );
}
