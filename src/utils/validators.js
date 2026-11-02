import { desformatarMoeda } from './formatters';

/**
 * Validação dos campos do produto segundo as regras de negócio:
 * 1. codigo: obrigatório, texto entre 3 e 10 caracteres.
 * 2. descricao: obrigatório, texto entre 3 e 200 caracteres.
 * 3. preco: obrigatório, valor numérico maior que zero (R$ X,XX).
 * 4. quantidadeEstoque: obrigatório, número inteiro maior que zero.
 */

export function validarProduto(dados) {
  const erros = {};

  // Validação do Código
  if (!dados.codigo || typeof dados.codigo !== 'string' || dados.codigo.trim() === '') {
    erros.codigo = 'O código é obrigatório.';
  } else {
    const codigoTrim = dados.codigo.trim();
    if (codigoTrim.length < 3 || codigoTrim.length > 10) {
      erros.codigo = 'O código deve conter entre 3 e 10 caracteres.';
    }
  }

  // Validação da Descrição
  if (!dados.descricao || typeof dados.descricao !== 'string' || dados.descricao.trim() === '') {
    erros.descricao = 'A descrição é obrigatória.';
  } else {
    const descricaoTrim = dados.descricao.trim();
    if (descricaoTrim.length < 3 || descricaoTrim.length > 200) {
      erros.descricao = 'A descrição deve conter entre 3 e 200 caracteres.';
    }
  }

  // Validação do Preço
  const precoNumerico = typeof dados.preco === 'number' ? dados.preco : desformatarMoeda(dados.preco);
  if (dados.preco === '' || dados.preco === null || dados.preco === undefined) {
    erros.preco = 'O preço é obrigatório.';
  } else if (isNaN(precoNumerico) || precoNumerico <= 0) {
    erros.preco = 'O preço deve ser um valor maior que zero (R$ X,XX).';
  }

  // Validação da Quantidade em Estoque
  const quantidade = dados.quantidadeEstoque !== undefined ? dados.quantidadeEstoque : dados.quantidade;
  if (quantidade === '' || quantidade === null || quantidade === undefined) {
    erros.quantidadeEstoque = 'A quantidade em estoque é obrigatória.';
  } else {
    const qtdNum = Number(quantidade);
    if (isNaN(qtdNum) || !Number.isInteger(qtdNum) || qtdNum <= 0) {
      erros.quantidadeEstoque = 'A quantidade em estoque deve ser um número inteiro maior que zero.';
    }
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros
  };
}

