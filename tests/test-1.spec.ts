import { test, expect } from '@playwright/test';

test('ct01-valida o comportamento quando o backend nao esta em execução', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('btnNavCadastrar').click();
  await page.getByTestId('codigo').click();
  await page.getByTestId('codigo').click();
  await page.getByTestId('codigo').press('CapsLock');
  await page.getByTestId('codigo').fill('PROD04');
  await page.getByTestId('quantidadeEstoque').click();
  await page.getByTestId('quantidadeEstoque').fill('22');
  await page.getByTestId('preco').click();
  await page.getByTestId('preco').fill('R$ 0,055');
  await page.getByTestId('descricao').click();
  await page.getByTestId('descricao').fill('TESTE');
  await page.getByTestId('btnSalvar').click();
  await expect(page.locator('#feedbackMensagem')).toContainText('Não foi possível conectar ao servidor backend em "http://localhost:8080" para cadastrar produto. Verifique se o serviço REST está em execução.');
});