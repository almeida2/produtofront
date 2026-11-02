import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('http://localhost:5173/');
  await page.getByTestId('btnExcluir_4').click();
  await page.getByTestId('btnExcluir').click();
});