import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estMessage } from '../public/js/brain.js';

test('un vrai message donne true', () => {
  assert.equal(estMessage({ role: 'user', text: 'cerise' }), true);
});

test('null donne false', () => {
  assert.equal(estMessage(null), false);
});

test('un rôle pirate donne false', () => {
  assert.equal(estMessage({ role: 'pirate', text: 'cerise' }), false);
});

test('un texte qui est un nombre donne false', () => {
  assert.equal(estMessage({ role: 'user', text: 42 }), false);
});
