import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computeBreakpoints, mediaQuery } from './grid.js';

@customElement('gl-display')
export class Display extends LitElement {
  static styles = css`
    @media ${mediaQuery('xs', 'sm')} {
      :host {
        display: var(--gridDisplay-xs);
      }
    }

    @media ${mediaQuery('sm', 'md')} {
      :host {
        display: var(--gridDisplay-sm);
      }
    }

    @media ${mediaQuery('md', 'lg')} {
      :host {
        display: var(--gridDisplay-md);
      }
    }

    @media ${mediaQuery('lg', 'xl')} {
      :host {
        display: var(--gridDisplay-lg);
      }
    }

    @media ${mediaQuery('xl', 'xxl')} {
      :host {
        display: var(--gridDisplay-xl);
      }
    }

    @media ${mediaQuery('xxl')} {
      :host {
        display: var(--gridDisplay-xxl);
      }
    }

    ::slotted(*) {
      width: 100%;
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

    const computedBreakpoints = computeBreakpoints<boolean>({
      xs: xs === '' ? undefined : Boolean(xs),
      sm: sm === '' ? undefined : Boolean(sm),
      md: md === '' ? undefined : Boolean(md),
      lg: lg === '' ? undefined : Boolean(lg),
      xl: xl === '' ? undefined : Boolean(xl),
      xxl: xxl === '' ? undefined : Boolean(xxl),
    });

    return html`
      <style>
        :host {
          --gridDisplay-xs: ${computedBreakpoints.xs ? 'flex' : 'none'};
          --gridDisplay-sm: ${computedBreakpoints.sm ? 'flex' : 'none'};
          --gridDisplay-md: ${computedBreakpoints.md ? 'flex' : 'none'};
          --gridDisplay-lg: ${computedBreakpoints.lg ? 'flex' : 'none'};
          --gridDisplay-xl: ${computedBreakpoints.xl ? 'flex' : 'none'};
          --gridDisplay-xxl: ${computedBreakpoints.xxl ? 'flex' : 'none'};
        }
      </style>
      <slot></slot>
    `;
  }
}
