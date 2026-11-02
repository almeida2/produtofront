import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('btnNavCadastrar').click();
  await page.getByTestId('codigo').click();
  await page.getByTestId('codigo').press('CapsLock');
  await page.getByTestId('codigo').fill('PRO04');
  await page.getByTestId('codigo').press('Tab');
  await page.getByTestId('quantidadeEstoque').fill('22');
  await page.getByTestId('quantidadeEstoque').press('Tab');
  await page.getByTestId('preco').fill('R$ 3,000');
  await page.getByTestId('preco').press('Tab');
  await page.getByTestId('descricao').fill('N');
  await page.getByTestId('descricao').press('CapsLock');
  await page.getByTestId('descricao').fill('Novo produto');
  await page.getByTestId('descricao').press('Tab');
  await page.getByTestId('btnSalvar').click();
  await page.getByTestId('btnNavListar').click();
  await expect(page.locator('#linhaProduto_4')).toContainText('PRO04');
});