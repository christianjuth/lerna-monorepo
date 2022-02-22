import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { theme } from './theme.js';
import { pxToRem } from './utils.js';

const BORDER_WIDTH = 1;

@customElement('gl-button')
export class Button extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: ${theme.roundness(1)};
      padding: 0;
      background: transparent;
      line-height: 1em;
      letter-spacing: 0.06em;
      cursor: pointer;
      text-align: center;
      white-space: nowrap;
      justify-content: center;
      height: fit-content;
      border: 1px solid transparent;
      text-decoration: none;
      width: 100%;
    }

    .sm {
      min-height: ${35 - BORDER_WIDTH * 2}px;
      line-height: ${35 - BORDER_WIDTH * 2}px;
      font-size: 1rem;
      padding: ${pxToRem(0, 10)};
    }

    .md {
      min-height: ${42 - BORDER_WIDTH * 2}px;
      line-height: ${42 - BORDER_WIDTH * 2}px;
      font-size: 1.1rem;
      padding: ${pxToRem(0, 15)};
    }

    .lg {
      min-height: ${48 - BORDER_WIDTH * 2}px;
      line-height: ${48 - BORDER_WIDTH * 2}px;
      font-size: 1.3rem;
      padding: ${pxToRem(0, 20)};
    }

    .outlined {
      border-color: var(--background-color);
      background-color: transparent;
      color: var(--background-color);
      transition: background-color 0.2s, color 0.2s;
    }
    .outlined:hover {
      background-color: var(--background-color);
      color: var(--color);
    }

    .contained {
      border-color: var(--background-color);
      background-color: var(--background-color);
      color: var(--color);
    }
  `;

  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String }) variant: 'contained' | 'outlined' = 'contained';

  @property({ type: String }) themeColor: 'accent1' | 'primary' = 'accent1';

  render() {
    return html`
      <button
        class=${classMap({ [this.size]: true, [this.variant]: true })}
        style=${styleMap({
          '--background-color': theme.color(this.themeColor, 9) as any,
          '--color': theme.color(this.themeColor, 9, 'text') as any,
        })}
      >
        <slot></slot>
      </button>
    `;
  }
}
