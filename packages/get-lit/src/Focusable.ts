import { LitElement } from 'lit';

export class Focusable extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static formAssociated = true;

  private handleClick() {
    this.focus();
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    super.disconnectedCallback?.();
  }
}
