import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { theme } from './theme.js';
import { Focusable } from './Focusable.js';

const ACTIVE_BORDER_WIDTH = 2;

@customElement('gl-input-wrap')
export class InputWrap extends LitElement {
  static styles = css`
    :host > div {
      position: relative;
      border-radius: ${theme.roundness(1)};
      line-height: 1em;
      border: none;
      display: flex;
      align-items: center;
      input::-webkit-search-decoration {
        -webkit-appearance: none;
      }
      transition: border-with 0.2s, background-color 0.2s;
    }

    div:before {
      content: ' ';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      border-width: 1px;
      border-style: solid;
      pointer-events: none;
      border-color: ${theme.color('gray', 4)};
      opacity: 0.9;
    }

    [data-active='true']:before {
      border-color: ${theme.color('accent1', 7)};
      border-width: ${ACTIVE_BORDER_WIDTH}px;
      opacity: 1;
    }
  `;

  @property({ type: Boolean }) active = false;

  render() {
    return html` <div data-active=${this.active}><slot></slot></div>`;
  }
}

export class InputBase extends Focusable {
  static styles = [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        outline: none;
        display: inline-block;
      }
    `,
  ];

  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, state: true }) active = false;

  private handleFocus() {
    this.active = true;
  }

  private handleBlur() {
    this.active = false;
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('blur', this.handleBlur);
  }

  disconnectedCallback() {
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('blur', this.handleBlur);
    super.disconnectedCallback?.();
  }

  getStyle(style?: { padding?: string }) {
    switch (this.size) {
      case 'sm':
        return {
          border: 'none',
          outline: 'none',
          width: '100%',
          background: 'transparent',
          'min-height': '35px',
          'font-size': '1rem',
          padding: '2px 9px',
          ...style,
        };
      case 'lg':
        return {
          border: 'none',
          outline: 'none',
          width: '100%',
          background: 'transparent',
          'min-height': '48px',
          'font-size': '1.3rem',
          padding: '2px 9px',
          ...style,
        };
      default:
        return {
          border: 'none',
          outline: 'none',
          width: '100%',
          background: 'transparent',
          'min-height': '42px',
          'font-size': '1.1rem',
          padding: '2px 12px',
          ...style,
        };
    }
  }
}
