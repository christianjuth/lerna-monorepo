import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputBase } from './gl-input-wrap.js';
import { theme } from './theme.js';

@customElement('gl-input')
export class Input extends InputBase {
  static styles = [
    ...InputBase.styles,
    css`
      div {
        min-width: 10px;
      }

      div > ::slotted(*) {
        margin: 0 8px;
      }

      input {
        color: ${theme.colorPresets.text};
      }
    `,
  ];

  @property({ type: String }) placeholder?: string = '';

  @property({ type: String }) type?: 'text' | 'password';

  connectedCallback() {
    super.connectedCallback?.();
  }

  render() {
    return html`
      <gl-input-wrap ?active="${this.active}">
        <div>
          <slot></slot>
          <slot name="left-icon"></slot>
        </div>
        <input
          style=${styleMap({
            ...this.getStyle(),
            paddingLeft: '0',
            paddingRight: '0',
          })}
          placeholder=${ifDefined(this.placeholder)}
          type=${ifDefined(this.type)}
        />
        <div>
          <slot></slot>
          <slot name="right-icon"></slot>
        </div>
      </gl-input-wrap>
    `;
  }
}
