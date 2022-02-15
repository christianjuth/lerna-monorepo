import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { theme } from './theme.js';

@customElement('gl-divider')
export class Divider extends LitElement {
  static styles = css`
    hr {
      border: none;
      height: 1px;
      background-color: ${theme.colorPresets.border};
    }

    div {
      height: 100%;
      width: 1px;
      background-color: ${theme.colorPresets.border};
    }
  `;

  @property({ type: String }) contentWidth = 'var(--main-gutters)';

  @property({ type: String }) vertical = 'false';

  render() {
    if (this.vertical !== 'false') {
      return html` <div></div> `;
    }

    return html` <hr /> `;
  }
}
