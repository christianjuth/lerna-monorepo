import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { TEXT_STYLES } from './gl-text.js';
import { generatePallet, VARIABLE_NAMES } from './theme.js';

// export const baseTheme: Theme.Config = {
//   primary: ({ l, shade }) => [191 + shade, 82, l],
//   accent1: ({ l, shade }) => [256, 100 - shade, l],
//   gray: ({ l, shade }) => [218, shade + 10, l],
// };

// export const darkTheme: Partial<Theme.Config> = {
//   gray: ({ l, shade }) => [218, 25 - shade, 100 - l],
// }

@customElement('gl-theme')
export class Theme extends LitElement {
  static styles = css`
    * {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
    }
  `;

  @property({ type: String }) primary = 'red';

  @property({ type: Number }) roundness = 5;

  render() {
    return html`
      <style>
        ${TEXT_STYLES}
      </style>
      <div
        style=${styleMap({
          '--main-gutters': 'calc(800px + 22vw)',
          ...generatePallet('primary', ({ l, shade }) => [191 + shade, 82, l]),
          ...generatePallet('accent1', ({ l, shade }) => [256, 100 - shade, l]),
          ...generatePallet('gray', ({ l, shade }) => [218, shade + 10, l]),
          [VARIABLE_NAMES.ROUNDNESS]: this.roundness,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
