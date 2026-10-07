import { test, expect } from '@playwright/test';
import { LIMITE } from '../public/js/brain.js';

test('affiche un conseil de secours quand la requête échoue', async ({ page }) => {
  await page.route('**/api/conseil', (route) => route.abort());
  await page.goto('/');
  await page.locator('#message').fill('conseil');
  await page.getByRole('button', { name: /envoyer/i }).click();
  await expect(page.locator('#messages li').last())
    .toContainText('Le serveur ne répond pas : conseil indisponible.');
});

test('refuse un message plus long que la limite avec une erreur visible', async ({ page }) => {
  await page.goto('/');
  await page.locator('#message').fill('a'.repeat(LIMITE + 1));
  await page.getByRole('button', { name: /envoyer/i }).click();
  await expect(page.locator('#status')).toContainText(String(LIMITE));
  await expect(page.locator('#messages li')).toHaveCount(0);
});

test('affiche une entrée HTML comme du texte littéral', async ({ page }) => {
  await page.goto('/');
  await page.locator('#message').fill('<b>test</b>');
  await page.getByRole('button', { name: /envoyer/i }).click();
  await expect(page.locator('#messages li').first()).toContainText('<b>test</b>');
  await expect(page.locator('#messages b')).toHaveCount(0);
});

test('reste lisible à 375 px sans débordement horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('#chat-form')).toBeVisible();
  await expect(page.getByRole('button', { name: /envoyer/i })).toBeVisible();
  const largeurDocument = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(largeurDocument).toBeLessThanOrEqual(375);
});
