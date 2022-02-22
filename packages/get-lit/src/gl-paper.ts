import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { theme } from './theme.js';

function getShadow(elevation: 0 | 1 | 2 | 3 | 4 | 5) {
  const shadows = [
    'none',
    '0px 2px 4px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.12)',
    '0 5px 10px rgba(0,0,0,0.12)',
    '0 8px 30px rgba(0,0,0,0.12)',
    '0 30px 60px rgba(0,0,0,0.12)',
  ];

  return shadows[elevation] ?? shadows[0];
}

@customElement('gl-paper')
export class Paper extends LitElement {
  // TODO: add dark mode bit
  static styles = css``;

  @property({ type: Number }) elevation: Parameters<typeof getShadow>[0] = 1;

  @property({ type: Number }) padding = 2;

  @property({ type: Number }) roundness = 1;

  render() {
    return html`
      <style>
        :host {
          box-shadow: ${getShadow(this.elevation)};
          border-radius: ${theme.roundness(this.roundness)};
          padding: ${theme.spacing(this.padding)};
        }
      </style>
      <slot></slot>
    `;
  }
}
