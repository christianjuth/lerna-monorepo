import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computeBreakpoints, mediaQuery } from './grid.js';
import { theme } from './theme.js';

@customElement('gl-grid')
export class Grid extends LitElement {
  static styles = css`
    :host {
      display: grid;
    }
  `;

  @property({ type: Number }) spacing = 0;

  @property({ type: String }) cols: string | number = '1fr 1fr 1fr';

  render() {
    const cols = /^[0-9]$/.test(String(this.cols))
      ? '1fr '.repeat(+this.cols)
      : this.cols;

    return html`
      <style>
        :host {
          grid-gap: ${theme.spacing(this.spacing)};
          grid-template-columns: ${cols};
        }
      </style>
      <slot></slot>
    `;
  }
}

@customElement('gl-grid-item')
export class GridItem extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    @media ${mediaQuery('xs', 'sm')} {
      :host {
        display: var(--gridDisplay-xs);
        grid-column: span var(--gridWidth-xs);
      }
    }

    @media ${mediaQuery('sm', 'md')} {
      :host {
        display: var(--gridDisplay-sm);
        grid-column: span var(--gridWidth-sm);
      }
    }

    @media ${mediaQuery('md', 'lg')} {
      :host {
        display: var(--gridDisplay-md);
        grid-column: span var(--gridWidth-md);
      }
    }

    @media ${mediaQuery('lg', 'xl')} {
      :host {
        display: var(--gridDisplay-lg);
        grid-column: span var(--gridWidth-lg);
      }
    }

    @media ${mediaQuery('xl', 'xxl')} {
      :host {
        display: var(--gridDisplay-xl);
        grid-column: span var(--gridWidth-xl);
      }
    }

    @media ${mediaQuery('xxl')} {
      :host {
        display: var(--gridDisplay-xxl);
        grid-column: span var(--gridWidth-xxl);
      }
    }
  `;

  @property({ type: String }) xs = '';

  @property({ type: String }) sm = '';

  @property({ type: String }) md = '';

  @property({ type: String }) lg = '';

  @property({ type: String }) xl = '';

  @property({ type: String }) xxl = '';

  render() {
    const { xs, sm, md, lg, xl, xxl } = this;

    const computedBreakpoints = computeBreakpoints<number | undefined>({
      xs: xs === '' ? undefined : parseInt(xs, 10),
      sm: sm === '' ? undefined : parseInt(sm, 10),
      md: md === '' ? undefined : parseInt(md, 10),
      lg: lg === '' ? undefined : parseInt(lg, 10),
      xl: xl === '' ? undefined : parseInt(xl, 10),
      xxl: xxl === '' ? undefined : parseInt(xxl, 10),
    });

    return html`
      <style>
        :host {
          --gridWidth-xs: ${computedBreakpoints.xs};
          --gridWidth-sm: ${computedBreakpoints.sm};
          --gridWidth-md: ${computedBreakpoints.md};
          --gridWidth-lg: ${computedBreakpoints.lg};
          --gridWidth-xl: ${computedBreakpoints.xl};
          --gridWidth-xxl: ${computedBreakpoints.xxl};
        }
      </style>
      <slot></slot>
    `;
  }
}
