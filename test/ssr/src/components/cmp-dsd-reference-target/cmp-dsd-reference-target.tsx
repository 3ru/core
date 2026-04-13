import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'cmp-dsd-reference-target',
  encapsulation: { type: 'shadow', referenceTarget: 'internal-input' },
})
export class ComponentDSDWithReferenceTarget {
  render() {
    return (
      <Host>
        <button id='internal-input'>Focus me!</button>
      </Host>
    );
  }
}
