import { describe, expect, it } from 'vitest';

import { getStaticGetter, transpileModule } from './transpile';

describe('parse referenceTarget', () => {
  it('shadow without referenceTarget', () => {
    const t = transpileModule(`
      @Component({
        tag: 'cmp-a',
        encapsulation: { type: 'shadow' }
      })
      export class CmpA {}
    `);

    expect(getStaticGetter(t.outputText, 'encapsulation')).toEqual('shadow');
    expect(getStaticGetter(t.outputText, 'referenceTarget')).toEqual(undefined);

    expect(t.cmp.encapsulation).toBe('shadow');
    expect(t.cmp.referenceTarget).toBe(null);
  });

  it('referenceTarget set', () => {
    const t = transpileModule(`
      @Component({
        tag: 'cmp-a',
        encapsulation: {
          type: 'shadow',
          referenceTarget: 'internal-input'
        }
      })
      export class CmpA {}
    `);

    expect(getStaticGetter(t.outputText, 'encapsulation')).toEqual('shadow');
    expect(getStaticGetter(t.outputText, 'referenceTarget')).toEqual('internal-input');

    expect(t.cmp.encapsulation).toBe('shadow');
    expect(t.cmp.referenceTarget).toBe('internal-input');
  });

  it('referenceTarget with delegatesFocus and slotAssignment', () => {
    const t = transpileModule(`
      @Component({
        tag: 'cmp-a',
        encapsulation: {
          type: 'shadow',
          delegatesFocus: true,
          referenceTarget: 'internal-input',
          slotAssignment: 'manual'
        }
      })
      export class CmpA {}
    `);

    expect(getStaticGetter(t.outputText, 'delegatesFocus')).toEqual(true);
    expect(getStaticGetter(t.outputText, 'referenceTarget')).toEqual('internal-input');
    expect(getStaticGetter(t.outputText, 'slotAssignment')).toEqual('manual');

    expect(t.cmp.shadowDelegatesFocus).toBe(true);
    expect(t.cmp.referenceTarget).toBe('internal-input');
    expect(t.cmp.slotAssignment).toBe('manual');
  });

  it('no encapsulation does not support referenceTarget', () => {
    const t = transpileModule(`
      @Component({
        tag: 'cmp-a'
      })
      export class CmpA {}
    `);

    expect(getStaticGetter(t.outputText, 'referenceTarget')).toEqual(undefined);
    expect(t.cmp.encapsulation).toBe('none');
    expect(t.cmp.referenceTarget).toBe(null);
  });

  it('should throw error for invalid referenceTarget value', () => {
    let error: Error | undefined;
    try {
      transpileModule(`
        @Component({
          tag: 'cmp-a',
          encapsulation: {
            type: 'shadow',
            referenceTarget: 42
          }
        })
        export class CmpA {}
      `);
    } catch (err: unknown) {
      error = err as Error;
    }

    expect(error).toBeDefined();
    expect(error.message).toContain('The "referenceTarget" option must be a string.');
  });
});
