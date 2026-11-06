import { test, expect } from '@playwright/test';

test('ct02-cadastrar-com-sucesso', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('btnNavCadastrar').click();
  await page.getByTestId('codigo').click();
  await page.getByTestId('codigo').press('CapsLock');
  await page.getByTestId('codigo').fill('PROD4');
  await page.getByTestId('codigo').press('Tab');
  await page.getByTestId('quantidadeEstoque').fill('25');
  await page.getByTestId('quantidadeEstoque').press('Tab');
  await page.getByTestId('preco').fill('R$ 0,010');
  await page.getByTestId('preco').press('CapsLock');
  await page.getByTestId('preco').press('Tab');
  await page.getByTestId('descricao').fill('produto de teste');
  await page.getByTestId('descricao').press('Tab');
  await page.getByTestId('btnSalvar').click();
  await expect(page.locator('#feedbackMensagem')).toContainText('Cadastro realizado com sucesso!');
});
