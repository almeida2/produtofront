import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('http://localhost:5173/');
  await page.getByTestId('btnNavCadastrar').click();
  await page.getByTestId('btnNavCadastrar').press('Tab');
  await page.getByTestId('codigo').click();
  await page.getByTestId('codigo').fill('prod07');
  await page.getByTestId('codigo').press('Tab');
  await page.getByTestId('quantidadeEstoque').fill('1');
  await page.getByTestId('quantidadeEstoque').press('Tab');
  await page.getByTestId('preco').fill('1');
  await page.getByTestId('preco').press('Tab');
  await page.getByTestId('descricao').fill('novo teste');
  await page.getByTestId('btnSalvar').click();
});