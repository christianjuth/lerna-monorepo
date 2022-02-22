import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { InputBase } from './gl-input-wrap.js';
import { theme } from './theme.js';

// ${({ $size }) => {
//   let size = 25;
//   switch ($size) {
//     case 'sm':
//       size = 21;
//       break;
//     case 'lg':
//       size = 28;
//   }

@customElement('gl-checkbox')
export class Checkbox extends InputBase {
  static styles = [
    ...InputBase.styles,
    css`
      :host {
        display: inline-block;
        position: relative;
        cursor: pointer;
        font-size: 22px;
        user-select: none;
      }

      input:hover::before {
        content: ' ';
        position: absolute;
        top: -30%;
        right: -30%;
        bottom: -30%;
        left: -30%;
        background-color: ${theme.color('accent1', 4, 0.25)};
        border-radius: 50%;
        order: 0;
      }

      input {
        position: absolute;
        cursor: pointer;
        height: 100%;
        width: 100%;
        margin: 0;
        border: none;
        background: none;
        appearance: none;
      }

      input:focus {
        outline: var(--outline);
      }

      span {
        position: relative;
        display: block;

        height: 25px;
        width: 25px;
        min-width: 25px;
        min-height: 25px;

        pointer-events: none;
        border-radius: ${theme.roundness(1)};
      }

      &:hover input ~ span {
        background-color: ${theme.color('gray', 2)};
      }

      input:checked ~ span {
        background-color: ${theme.color('accent1', 9)};
      }

      span:after {
        content: '';
        position: absolute;
        display: none;
      }

      input:checked ~ span:after {
        display: block;
      }

      span:after {
        top: calc(50% - 8px);
        left: calc(50% - 4px);
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    `,
  ];

  @property({ type: String }) checked: 'true' | 'false' = 'false';

  private toggle() {
    this.checked = this.checked !== 'false' ? 'false' : 'true';
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.addEventListener('click', this.toggle);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.removeEventListener('click', this.toggle);
  }

  render() {
    return html`
      <gl-input-wrap ?active="${this.active}">
        <input .checked=${this.checked !== 'false'} type="checkbox" />
        <span></span>
      </gl-input-wrap>
    `;
  }
}
