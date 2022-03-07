import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('gl-link')
export class Link extends LitElement {
  static styles = css``;

  private emitClick() {
    this.dispatchEvent(
      new Event('link-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleLinkClick(e: MouseEvent) {
    e.preventDefault();
    this.emitClick();
  }

  connectedCallback(): void {
    super.connectedCallback?.();
    this.addEventListener('click', this.handleLinkClick);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.handleLinkClick);
  }

  render() {
    return html` <a href="#"><slot></slot></a> `;
  }
}
