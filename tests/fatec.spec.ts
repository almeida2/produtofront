import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://fatecipiranga.cps.sp.gov.br/');
    await page.getByRole('searchbox', { name: 'O que deseja localizar?' }).click();
    await page.getByRole('searchbox', { name: 'O que deseja localizar?' }).fill('vestibular');
    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await page.goto('https://fatecipiranga.cps.sp.gov.br/?s=vestibular');
    await expect(page.locator('h1')).toContainText('Resultados encontrados para: vestibular');
});