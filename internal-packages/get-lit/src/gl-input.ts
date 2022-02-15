import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { InputBase } from './gl-input-wrap.js';

@customElement('gl-input')
export class Input extends InputBase {
  render() {
    return html`
      <gl-input-wrap ?active="${this.active}">
        <input style=${styleMap(this.getStyle())} />
      </gl-input-wrap>
    `;
  }
}
