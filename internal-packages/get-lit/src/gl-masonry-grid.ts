import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { theme } from './theme.js';

const SPACING_VAR = '--masonry-grid-spacing';
const MIN_ITEM_WIDTH_VAR = '--masonry-grid-min-item-width';

@customElement('gl-masonry-grid')
export class MasonryGrid extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-rows: repeat(auto-fill, 1px);
      grid-column-gap: var(${unsafeCSS(SPACING_VAR)});
      grid-template-columns: repeat(
        auto-fit,
        minmax(min(var(${unsafeCSS(MIN_ITEM_WIDTH_VAR)}, 639px), 100%), 1fr)
      );
      margin-top: calc(var(${unsafeCSS(SPACING_VAR)}) * -1);
    }

    ::slotted(gl-masonry-grid-item) {
      padding-top: var(${unsafeCSS(SPACING_VAR)});
    }
  `;

  @property({ type: Number }) cols: number = 3;

  @property() minItemWidth: string | number = '300px';

  @property({ type: Number }) spacing: number = 0;

  render() {
    const minItemWidth =
      typeof this.minItemWidth === 'number'
        ? `${this.minItemWidth}px`
        : this.minItemWidth;
    return html`
      <style>
        :host {
          prettier_html_placeholder_0_7_in_js: ${minItemWidth};
          prettier_html_placeholder_2_7_in_js: ${theme.spacing(this.spacing)};
        }
      </style>
      <slot></slot>
    `;
  }
}

@customElement('gl-masonry-grid-item')
export class MasonryGridItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: fit-content;
    }
  `;

  @property({ type: String, state: true }) height: string = '1';

  observer = new ResizeObserver(() => {
    this.height = String(this.offsetHeight);
  });

  connectedCallback() {
    super.connectedCallback?.();
    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.observer.unobserve(this);
    super.disconnectedCallback?.();
  }

  render() {
    return html`
      <style>
        :host {
          grid-row: span ${this.height};
        }
      </style>
      <slot></slot>
    `;
  }
}
