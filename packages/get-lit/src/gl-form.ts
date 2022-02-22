import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computeBreakpoints, mediaQuery } from './grid.js';
import { uuid } from './utils.js';

@customElement('gl-form-item')
export class FormItem extends LitElement {
  @property({ type: String }) xs = '';

  @property({ type: String }) sm = '';

  @property({ type: String }) md = '';

  @property({ type: String }) lg = '';

  @property({ type: String }) xl = '';

  @property({ type: String }) xxl = '';

  static styles = css`
    :host {
      display: block;
    }

    div {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
    }

    ::slotted(label:first-child) {
      margin-bottom: 5px;
      min-width: 100%;
      font-weight: 500;
    }

    ::slotted(label:nth-child(2)) {
      margin-left: 8px;
      flex: 1;
    }

    ::slotted(*:not(label):not(:first-child)) {
      min-width: 100%;
    }

    ::slotted(:nth-child(3)) {
      margin-top: 8px;
    }

    @media ${mediaQuery('xs', 'sm')} {
      :host {
        grid-column: span var(--gridWidth-xs);
      }
    }

    @media ${mediaQuery('sm', 'md')} {
      :host {
        grid-column: span var(--gridWidth-sm);
      }
    }

    @media ${mediaQuery('md', 'lg')} {
      :host {
        grid-column: span var(--gridWidth-md);
      }
    }

    @media ${mediaQuery('lg', 'xl')} {
      :host {
        grid-column: span var(--gridWidth-lg);
      }
    }

    @media ${mediaQuery('xl', 'xxl')} {
      :host {
        grid-column: span var(--gridWidth-xl);
      }
    }

    @media ${mediaQuery('xxl')} {
      :host {
        grid-column: span var(--gridWidth-xxl);
      }
    }
  `;

  @property({ type: String }) label: string = '';

  private uuid = uuid();

  attachLabels() {
    const children = Array.from(this.children);
    let foundLabel = false;
    let foundControl = false;

    for (const child of children) {
      if (child.tagName === 'LABEL') {
        const label = child as HTMLLabelElement;
        label.htmlFor = `${this.uuid}`;
        foundLabel = true;
      } else if ((child as any).focus !== undefined) {
        child.id = `${this.uuid}`;
        foundControl = true;
      }

      if (foundLabel && foundControl) {
        break;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.attachLabels();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
  }

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
      <div>
        <slot></slot>
      </div>
    `;
  }
}
