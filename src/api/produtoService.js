/**
 * Serviço de API para gestão de Produtos.
 * Base URL configurável via variável de ambiente VITE_API_URL (padrão: http://localhost:8080).
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const ENDPOINT = `${BASE_URL}/api/v1/produtos`;

/**
 * Auxiliar para processar respostas da API e formatar erros amigáveis.
 */
async function processarResposta(response, operacaoDescricao) {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  }

  // Tratamento de erros HTTP
  let mensagemErro = `Falha ao ${operacaoDescricao} (Status ${response.status}).`;

  try {
    const errorBody = await response.json();
    if (errorBody.message) {
      mensagemErro = errorBody.message;
    } else if (errorBody.mensagem) {
      mensagemErro = errorBody.mensagem;
    } else if (errorBody.error) {
      mensagemErro = errorBody.error;
    } else if (Array.isArray(errorBody.errors)) {
      mensagemErro = errorBody.errors.join('; ');
    } else if (typeof errorBody === 'string') {
      mensagemErro = errorBody;
    }
  } catch {
    if (response.status === 404) {
      mensagemErro = 'Produto não encontrado.';
    } else if (response.status === 409) {
      mensagemErro = 'Código de produto já existente no sistema.';
    } else if (response.status === 400) {
      mensagemErro = 'Dados inválidos fornecidos para a operação.';
    } else if (response.status === 500) {
      mensagemErro = 'Erro interno do servidor ao processar a requisição.';
    }
  }

  const erro = new Error(mensagemErro);
  erro.status = response.status;
  throw erro;
}

/**
 * Trata erros de rede/conexão de forma amigável
 */
function tratarErroDeConexao(error, operacaoDescricao) {
  if (error.name === 'TypeError' || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
    throw new Error(
      `Não foi possível conectar ao servidor backend em "${BASE_URL}" para ${operacaoDescricao}. Verifique se o serviço REST está em execução.`
    );
  }
  throw error;
}

export const produtoService = {
  /**
   * Obtém a URL base configurada
   */
  getBaseUrl() {
    return BASE_URL;
  },

  /**
   * POST /api/v1/produtos
   * Cadastra um novo produto.
   * @param {{ codigo: string, descricao: string, preco: number, quantidadeEstoque: number }} produto 
   */
  async cadastrar(produto) {
    try {
      const payload = {
        codigo: String(produto.codigo).trim(),
        descricao: String(produto.descricao).trim(),
        preco: Number(produto.preco),
        quantidadeEstoque: Number(produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : produto.quantidade)
      };

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      return await processarResposta(response, 'cadastrar produto');
    } catch (error) {
      tratarErroDeConexao(error, 'cadastrar produto');
    }
  },

  /**
   * GET /api/v1/produtos
   * Lista todos os produtos cadastrados.
   * @returns {Promise<Array>}
   */
  async listar() {
    try {
      const response = await fetch(ENDPOINT, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      const resultado = await processarResposta(response, 'listar produtos');
      if (Array.isArray(resultado)) {
        return resultado;
      }
      if (resultado && Array.isArray(resultado.content)) {
        return resultado.content;
      }
      return [];
    } catch (error) {
      tratarErroDeConexao(error, 'listar produtos');
    }
  },

  /**
   * GET /api/v1/produtos/{id}
   * Busca um produto específico pelo ID.
   * @param {string|number} id 
   */
  async buscarPorId(id) {
    if (!id) {
      throw new Error('ID do produto não informado.');
    }

    try {
      const response = await fetch(`${ENDPOINT}/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      return await processarResposta(response, `buscar produto pelo ID ${id}`);
    } catch (error) {
      tratarErroDeConexao(error, `buscar produto pelo ID ${id}`);
    }
  },

  /**
   * PUT /api/v1/produtos/{id}
   * Atualiza um produto existente pelo ID.
   * @param {string|number} id 
   * @param {{ codigo: string, descricao: string, preco: number, quantidadeEstoque: number }} produto 
   */
  async atualizar(id, produto) {
    if (!id) {
      throw new Error('ID do produto não informado para atualização.');
    }

    try {
      const payload = {
        codigo: String(produto.codigo).trim(),
        descricao: String(produto.descricao).trim(),
        preco: Number(produto.preco),
        quantidadeEstoque: Number(produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : produto.quantidade)
      };

      const response = await fetch(`${ENDPOINT}/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      return await processarResposta(response, `atualizar produto com ID ${id}`);
    } catch (error) {
      tratarErroDeConexao(error, `atualizar produto com ID ${id}`);
    }
  },

  /**
   * DELETE /api/v1/produtos/{id}
   * Exclui um produto pelo ID.
   * @param {string|number} id 
   */
  async excluir(id) {
    if (!id) {
      throw new Error('ID do produto não informado para exclusão.');
    }

    try {
      const response = await fetch(`${ENDPOINT}/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });

      return await processarResposta(response, `excluir produto com ID ${id}`);
    } catch (error) {
      tratarErroDeConexao(error, `excluir produto com ID ${id}`);
    }
  }
};
