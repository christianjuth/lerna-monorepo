import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  generatePallet,
  theme as themeConst,
  Theme as ThemeType,
  VARIABLE_NAMES,
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

  for (const [key, value] of Object.entries(theme)) {
    if (typeof value === 'function') {
      out = {
        ...out,
        ...generatePallet(key as any, value),
      };
    } else {
      out = {
        ...out,
        ...generatePallet(key as any, ({ l }) => {
          const [h, s, invertL] = value;
          return invertL < 0 ? [h, s, 100 - l] : [h, s, l];
        }),
      };
    }
  }

  return out;
}

function serializeTheme(obj: Record<string, string | number>) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';');
}

@customElement('gl-theme')
export class Theme extends LitElement {
  @property({ type: String }) addBodyStyles: 'true' | 'false' = 'false';

  @property({ type: Boolean, state: true }) hideOutline = false;

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

    // global mode
    this.elementChildren = Array.from(this.childNodes);
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

    const baseVars = serializeTheme(
      useDarkTheme
        ? generateTheme({ ...(baseTheme ?? {}), ...(darkTheme ?? {}) })
        : generateTheme(baseTheme ?? {})
    );

    let darkVars = '';
    if (useDarkTheme === undefined && darkTheme) {
      darkVars = serializeTheme(generateTheme(darkTheme));
    }

    return html`
      <style>
        :host {
          display: block;
        }

        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }

        body, :host {
          --main-gutters: calc(800px + 22vw);
          ${baseVars};
          ${VARIABLE_NAMES.ROUNDNESS}: ${roundness};
          ${VARIABLE_NAMES.OUTLINE}: ${this.hideOutline ? 'none' : 'auto'};
          background-color: ${themeConst.colorPresets.background};
          color: ${themeConst.colorPresets.text};
        }

        @media (prefers-color-scheme: dark) {
          body, :host {
            ${darkVars};
          }
        }
      </style>
      <slot></slot>
    `;
  }

  // global mode
  elementChildren: Array<any> = [];

  slotContents: any;

  get slotElements(): any[] {
    return this.elementChildren;
  }

  createRenderRoot() {
    if (this.addBodyStyles !== 'false') {
      return this;
    }
    return super.createRenderRoot();
  }
}
