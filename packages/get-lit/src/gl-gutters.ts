import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('gl-gutters')
export class Gutters extends LitElement {
  static styles = css`
    :host > div {
      display: grid;
    }

    :host > div > div {
      grid-column: 2 / 3;
    }
  `;

  @property({ type: String }) contentWidth = 'var(--main-gutters)';

  render() {
    return html`
      <div
        style=${styleMap({
          gridTemplateColumns: `1fr minmax(auto, ${this.contentWidth}) 1fr`,
        })}
      >
        <div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
