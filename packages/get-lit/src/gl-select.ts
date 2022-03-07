import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputBase } from './gl-input-wrap.js';
import { theme } from './theme.js';
import { downArrow } from './icons.js';

type Option<T> = {
  label: string;
  value: T;
};

@customElement('gl-select')
export class Select<T extends string | number> extends InputBase {
  static styles = [
    ...InputBase.styles,
    css`
      div {
        min-width: 10px;
      }

      input {
        color: ${theme.colorPresets.text};
        cursor: default;
      }

      input.has-value::placeholder {
        color: ${theme.colorPresets.text};
      }

      input::-webkit-calendar-picker-indicator {
        display: none !important;
      }

      svg {
        margin: 0 8px 0 3px;
      }
    `,
  ];

  @property({ type: Array }) options: Option<T>[] = [];

  @property({ type: String }) placeholder?: string = '';

  @property({ type: String }) valuePlaceholder?: string = '';

  @property({ type: Object, state: true }) value: Option<T> | null = null;

  @property({ type: String, state: true }) autoCompleteValue: string = '';

  connectedCallback() {
    super.connectedCallback?.();
  }

  private getAutoCompletion() {
    const input = this.renderRoot.querySelector('input');
    const search = input?.value.toLowerCase() ?? '';
    if (search.length > 0 && input) {
      const item = this.options.find(
        opt => opt.label.toLowerCase().indexOf(search) === 0
      );
      if (item) {
        const prevValue = input.value;
        input.value = item.label;
        input.setSelectionRange(prevValue.length, item.label.length);
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Backspace') {
      setTimeout(() => {
        this.getAutoCompletion();
      }, 0);
    }
  }

  private handleClose() {
    const input = this.renderRoot.querySelector('input');
    const search = input?.value.toLowerCase() ?? '';
    const item = this.options.find(
      opt => opt.label.toLowerCase().indexOf(search) === 0
    );
    this.value = item ?? null;
    if (input) {
      this.valuePlaceholder = item?.label ?? this.placeholder ?? '';
      input.value = '';
      input.blur();
    }
  }

  render() {
    return html`
      <gl-input-wrap ?active="${this.active}">
        <input
          list="browsers"
          style=${styleMap({ ...this.getStyle(), paddingRight: '0' })}
          placeholder=${ifDefined(this.valuePlaceholder || this.placeholder)}
          @keydown=${this.handleKeyDown}
          @change=${this.handleClose}
          class=${(this.valuePlaceholder?.length ?? 0) > 0 ? 'has-value' : ''}
          autocomplete="off"
        />
        ${downArrow}
        <datalist id="browsers">
          ${this.options.map(
            option => html`<option value=${option.label}></option>`
          )}
        </datalist>
      </gl-input-wrap>
    `;
  }
}
