import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  generatePallet,
  VARIABLE_NAMES,
  Theme as ThemeType,
  theme as themeConst,
} from './theme.js';

const accessibilityKeys = [
  'Tab',
  'ArrowUp',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'Escape',
  ' ', // space
];

function generateTheme(theme: Partial<ThemeType.Config>) {
  let out: Record<string, string | number> = {};

  Object.entries(theme).forEach(([key, value]) => {
    out = {
      ...out,
      ...generatePallet(key as any, value),
    };
  });

  return out;
}

@customElement('gl-theme')
export class Theme extends LitElement {
  static styles = css`
    * {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
    }

    div {
      color: ${themeConst.colorPresets.text};
    }
  `;

  @property({ type: String }) primary = 'red';

  @property({ type: Boolean }) hideOutline = false;

  @property({ type: Object }) theme: {
    baseTheme?: ThemeType.Config;
    darkTheme?: Partial<ThemeType.Config>;
    useDarkTheme?: boolean;
    roundness?: number;
  } = {};

  handleKeyDown = (e: KeyboardEvent) => {
    if (accessibilityKeys.includes(e.key)) {
      this.hideOutline = false;
      this.requestUpdate();
    }
  };

  disableOutline = () => {
    this.hideOutline = true;
    this.requestUpdate();
  };

  connectedCallback(): void {
    super.connectedCallback?.();
    this.disableOutline.bind(this);
    this.handleKeyDown.bind(this);
    window.addEventListener('mousedown', this.disableOutline);
    window.addEventListener('touchstart', this.disableOutline);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback(): void {
    window.removeEventListener('mousedown', this.disableOutline);
    window.removeEventListener('touchstart', this.disableOutline);
    window.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback?.();
  }

  render() {
    const { baseTheme, darkTheme, useDarkTheme, roundness } = {
      roundness: 5,
      ...this.theme,
    };

    return html`
      <div
        style=${styleMap({
          '--main-gutters': 'calc(800px + 22vw)',
          ...(useDarkTheme
            ? generateTheme({ ...baseTheme, ...darkTheme } ?? {})
            : generateTheme(baseTheme ?? {})),
          [VARIABLE_NAMES.ROUNDNESS]: roundness,
          [VARIABLE_NAMES.OUTLINE]: this.hideOutline ? 'none' : 'auto',
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
