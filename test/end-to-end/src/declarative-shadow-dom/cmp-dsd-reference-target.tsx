import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'cmp-dsd-reference-target',
  shadow: { referenceTarget: 'internal-input' },
})
export class ComponentDSDWithReferenceTarget {
  render() {
    return (
      <Host>
        <button id="internal-input">Focus me!</button>
      </Host>
    );
  }
}
