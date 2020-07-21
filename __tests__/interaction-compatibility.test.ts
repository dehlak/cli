/* eslint-disable @typescript-eslint/no-empty-function */
import test, { ExecutionContext } from 'ava';

import toCompatibility, {
  Compatibility,
} from '../src/interactions/compatibility';

type Context = ExecutionContext<unknown>;

test('extract compatibility for: () => boolean', (t: Context): void => {
  const code = 'function yes(): boolean { return true; }';

  const compatibility = toCompatibility(code);

  t.deepEqual(compatibility, {
    name: 'yes',
    parameters: {},
    type: Compatibility.Boolean,
  });
});

test('extract compatibility for: (price: number, quantity: number) => number', (t: Context): void => {
  const code =
    'function subtotal(price: number, quantity: number): number { return price * quantity; }';

  const compatibility = toCompatibility(code);

  t.deepEqual(compatibility, {
    name: 'subtotal',
    parameters: {
      price: Compatibility.Number,
      quantity: Compatibility.Number,
    },
    type: Compatibility.Number,
  });
});

test('fail extraction: () => void', (t: Context): void => {
  const code = 'function f(): void { }';

  t.throws(() => toCompatibility(code), {
    name: 'TypeError',
    message: 'unsupported type: void',
  });
});
