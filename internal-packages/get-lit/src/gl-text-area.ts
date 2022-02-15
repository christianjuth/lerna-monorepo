import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { InputBase } from './gl-input-wrap.js';

@customElement('gl-text-area')
export class TextArea extends InputBase {
  @property({ type: Number }) rows: number = 5;

  render() {
    return html`
      <gl-input-wrap ?active="${this.active}">
        <textarea
          style=${styleMap(this.getStyle({ padding: '8px' }))}
          rows=${this.rows}
        ></textarea>
      </gl-input-wrap>
    `;
  }
}
