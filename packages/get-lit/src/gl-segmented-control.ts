import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { theme } from './theme.js';

type Option<T> = {
  label: string;
  value: T;
};

@customElement('gl-segmented-control')
export class SegmentedControl<T extends string | number> extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      --padding: 3px;
      display: flex;
      flex-direction: row;
      position: relative;
      padding: var(--padding);
      border-radius: 5px;
      width: fit-content;
      background-color: ${theme.color('gray', 2)};
    }

    .thing {
      content: ' ';
      display: block;
      position: absolute;
      top: var(--padding);
      left: var(--padding);
      bottom: var(--padding);
      background-color: ${theme.colorPresets.background};
      border-radius: 5px;
    }

    .thing.animate {
      transition: width 0.2s, transform 0.2s;
    }

    .label {
      display: flex;
      border: none;
      padding: 4px 15px;
      border-radius: 5px;
      position: relative;
      background: transparent;
      cursor: pointer;
      font-size: 1.1rem;
      transition: color 0.2s;
      color: ${theme.colorPresets.text};
    }

    .divider {
      margin-top: 5px;
      margin-bottom: 5px;
      width: 1px;
      background-color: ${theme.color('gray', 4)};
      transition: opacity 0.4s;
    }

    .divider.selected {
      opacity: 0;
    }

    input {
      display: none;
    }
  `;

  @property({ type: Array }) options: Option<T>[] = [];

  @property({ type: Number }) selectedIndex: number = 0;

  @property({ type: Number }) width: number = 200;

  @property({ type: Number }) left: number = 0;

  private select(index: number) {
    this.selectedIndex = index;

    const labels = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>('.label')
    );
    const selectedLabel = labels[index];

    this.width = selectedLabel.offsetWidth;
    this.left = selectedLabel.offsetLeft;

    const value = this.options[index];
    const input = this.renderRoot.querySelector<HTMLInputElement>('input');
    if (input) {
      input.value = String(value.value);
    }
  }

  firstUpdated() {
    this.select(0);

    // TODO: find a better place to put this
    setTimeout(() => {
      const thing = this.renderRoot.querySelector<HTMLElement>('.thing');
      thing?.classList.add('animate');
    }, 0);
  }

  render() {
    return html`
      <style>
        .thing {
          width: ${this.width}px;
          transform: translate(calc(${this.left}px - var(--padding)), 0);
        }
      </style>
      <input type="radio" tabindex="-1" />
      <div class="container">
        <div class="thing"></div>
        ${this.options.map(
          (opt, i) =>
            html`
              ${i > 0
                ? html`<div
                    class="divider ${this.selectedIndex + 1 === i ||
                    this.selectedIndex === i
                      ? 'selected'
                      : ''}"
                  ></div>`
                : ''}
              <button
                class="label ${this.selectedIndex}"
                @click=${() => this.select(i)}
              >
                ${opt.label}
              </button>
            `
        )}
      </div>
    `;
  }
}
