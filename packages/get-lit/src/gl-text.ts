import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { theme } from './theme.js';

const htmlTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
  'time',
  'blockquote',
  'label',
  'figcaption',
] as const;

const sizes = ['sm', 'md', 'lg'] as const;

type GetArrayElementType<T extends readonly any[]> =
  T extends readonly (infer U)[] ? U : never;

const genName = (
  variant:
    | string
    | 'truncate'
    | 'numOfLines'
    | 'no-padding'
    | 'uppercase'
    | 'text-muted'
) => `Text-${variant}`;

const TRUNCATE_CLASS = genName('truncate');
const NO_PADDING_CLASS = genName('no-padding');
const UPPERCASE_CLASS = genName('uppercase');
const ITALIC_CLASS = genName('italic');
const PARAGRAPH_CLASS = genName('paragraph');
const TEXT_MUTED_CLASS = genName('text-muted');
const NUM_OF_LINES_VAR = genName('numOfLines');

const TEXT_STYLES = unsafeCSS(`
  :host {
    display: block;
  }

  :host(:first-of-type) {
    margin-top: 0;
  }

  * {
    margin: 0;
    margin-block: 0 0;
    font-weight: inherit;
    color: ${theme.colorPresets.text};
  }

  .${PARAGRAPH_CLASS} {
    line-height: 1.8em;
  }

  .${TRUNCATE_CLASS} {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: var(--${NUM_OF_LINES_VAR});
    word-wrap: break-word;
  }
  .${NO_PADDING_CLASS}.${NO_PADDING_CLASS}.${NO_PADDING_CLASS} {
    margin: 0;
    padding: 0;
  }
  .${TEXT_MUTED_CLASS}, .${TEXT_MUTED_CLASS} * {
    color: ${theme.color('gray', 9)};
  }
  .${UPPERCASE_CLASS} {
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .${ITALIC_CLASS} {
    font-style: italic;
  }
`);

@customElement('gl-text')
export class Text extends LitElement {
  static styles = css`
    ${TEXT_STYLES}
  `;

  @property({ type: String }) tag: GetArrayElementType<typeof htmlTags> = 'h1';

  @property({ type: String }) size: GetArrayElementType<typeof sizes> = 'md';

  @property({ type: String }) uppercase: 'true' | 'false' = 'false';

  @property({ type: String }) heading: 'true' | 'false' = 'false';

  @property({ type: String }) paragraph: 'true' | 'false' = 'false';

  @property({ type: String }) muted: 'true' | 'false' = 'false';

  @property({ type: String }) italic: 'true' | 'false' = 'false';

  getElement(classes: Record<string, any>) {
    switch (this.tag) {
      case 'h1':
        return html`<h1 class=${classMap(classes)}><slot></slot></h1>`;
      case 'h2':
        return html`<h2 class=${classMap(classes)}><slot></slot></h2>`;
      case 'h3':
        return html`<h3 class=${classMap(classes)}><slot></slot></h3>`;
      case 'h4':
        return html`<h4 class=${classMap(classes)}><slot></slot></h4>`;
      case 'h5':
        return html`<h5 class=${classMap(classes)}><slot></slot></h5>`;
      case 'p':
        return html`<h5 class=${classMap(classes)}><slot></slot></h5>`;
      case 'time':
        return html`<h5 class=${classMap(classes)}><slot></slot></h5>`;
      case 'blockquote':
        return html`<h5 class=${classMap(classes)}><slot></slot></h5>`;
      case 'label':
        return html`<h5 class=${classMap(classes)}><slot></slot></h5>`;
      case 'figcaption':
        return html`<h5 class=${classMap(classes)}><slot></slot></h5>`;
      default:
        return html`<span class=${classMap(classes)}><slot></slot></span>`;
    }
  }

  getSize() {
    switch (this.size) {
      case 'sm':
        return '1em';
      case 'md':
        return '1.2em';
      case 'lg':
        return '1.4em';
      default:
        return '1em';
    }
  }

  render() {
    const isHeading = String(this.heading) !== 'false';
    const isParagraph = String(this.paragraph) !== 'false';
    const muted = String(this.muted) !== 'false';
    const italic = String(this.italic) !== 'false';
    const uppercase = String(this.uppercase) !== 'false';

    const classes = {
      [TEXT_MUTED_CLASS]: muted,
      [PARAGRAPH_CLASS]: isParagraph,
      [ITALIC_CLASS]: italic,
      [UPPERCASE_CLASS]: uppercase,
    };

    return html`
      <style>
        :host {
          font-size: ${isHeading ? 'min(calc(1rem + 1vw), 1.5rem)' : '1rem'};
          font-weight: ${isHeading ? '900' : 'normal'};
          margin-top: ${isHeading || isParagraph ? '1.35em' : '0.65em'};
        }

        * {
          font-size: ${this.getSize()};
        }
      </style>
      ${this.getElement(classes)}
    `;
  }
}
