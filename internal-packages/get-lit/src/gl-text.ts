import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { theme } from './theme.js';
import { pxToRem } from './utils.js';

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
const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'copy-1',
  'copy-2',
  'p',
  'link',
] as const;

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
const TEXT_MUTED_CLASS = genName('text-muted');
const NUM_OF_LINES_VAR = genName('numOfLines');
const SPACING_AFTER_TEXT = '10px';

function headingSize(size: number) {
  return `calc(${pxToRem(size)} + min(2vw, ${size / 2}px))`;
}

export const TEXT_STYLES = unsafeCSS(`
  .${genName('h1')} {
    font-size: ${headingSize(45)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('h2')} {
    font-size: ${headingSize(38)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('h3')} {
    font-size: ${headingSize(32)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('h4')} {
    font-size: ${headingSize(27)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('h5')} {
    font-size: ${headingSize(24)};
    font-style: normal;
    font-weight: 700;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('h6')} {
    font-size: ${headingSize(18)};
    font-style: normal;
    font-weight: 700;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('copy-1')}, .${genName('copy-1')} a,
  .${genName('p')}, p {
    font-size: ${pxToRem(20)};
    font-style: normal;
    font-weight: 400;
    line-height: 1.5em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('link')}, a {
    font-size: ${pxToRem(18)};
    font-style: normal;
    font-weight: 400;
    line-height: ${22 / 18}em;
    text-decoration: none;
    cursor: pointer;

    color: ${theme.color('accent1', 10)};
    &:hover {
      text-decoration: underline;
    }
  }
  .${genName('copy-2')}, .${genName('copy-2')} a {
    font-size: ${pxToRem(17)};
    font-style: normal;
    font-weight: 400;
    line-height: ${16 / 14}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName('p')}, p {
    line-height: 1.8em;
    display: block;
    margin-block-start: 0;
    margin-block-end: 2em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-bottom: ${SPACING_AFTER_TEXT};
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
  .${TEXT_MUTED_CLASS} {
    color: ${theme.color('gray', 9)};
  }
  .${UPPERCASE_CLASS} {
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
`);

@customElement('gl-text')
export class Text extends LitElement {
  static styles = css`
    ${TEXT_STYLES}
  `;

  @property({ type: String }) tag: GetArrayElementType<typeof htmlTags> = 'h1';

  @property({ type: String }) variant: GetArrayElementType<typeof variants> =
    'h1';

  @property({ type: String }) uppercase: 'true' | 'false' = 'false';

  render() {
    const classes = {
      [genName(this.variant)]: true,
      [UPPERCASE_CLASS]: this.uppercase !== 'false',
    };

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
}
