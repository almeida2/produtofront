import { formatarMoeda } from '../../../utils/formatters';
import './ListarProdutosStyles.css';

/**
 * Componente Presentational para Listar Produtos.
 * Responsável apenas pela renderização visual da listagem e captura de eventos.
 */
export function ListarProdutosView({
  produtos,
  carregando,
  filtro,
  erroCarregamento,
  aoMudarFiltro,
  aoRecarregar,
  aoNovo,
  aoConsultar,
  aoEditar,
  aoExcluir
}) {
  return (
    <section className="listar-container" aria-labelledby="tituloOperacao">
      <h3 id="tituloOperacao" name="tituloOperacao" data-testid="tituloOperacao" className="listar-titulo-operacao">
        Listar
      </h3>

      {/* Barra de Ferramentas / Filtro */}
      <div className="listar-barra-ferramentas">
        <div className="listar-grupo-filtro">
          <label htmlFor="filtroBusca" className="listar-rotulo-filtro">
            Filtrar por código ou descrição:
          </label>
          <input
            type="text"
            id="filtroBusca"
            name="filtroBusca"
            data-testid="filtroBusca"
            className="listar-input-filtro"
            value={filtro}
            onChange={aoMudarFiltro}
            placeholder="Digite para filtrar..."
            autoComplete="off"
          />
        </div>

        <div className="listar-botoes-topo">
          <button
            type="button"
            id="btnAtualizarLista"
            name="btnAtualizarLista"
            data-testid="btnAtualizarLista"
            className="listar-btn-atualizar"
            onClick={aoRecarregar}
            disabled={carregando}
          >
            {carregando ? 'Atualizando...' : '↻ Atualizar Lista'}
          </button>
          <button
            type="button"
            id="btnNovoProduto"
            name="btnNovoProduto"
            data-testid="btnNovoProduto"
            className="listar-btn-novo"
            onClick={aoNovo}
          >
            + Cadastrar Produto
          </button>
        </div>
      </div>

      {/* Tabela de Produtos */}
      {carregando && (
        <div id="statusCarregando" name="statusCarregando" className="listar-estado-carregando">
          Carregando produtos do servidor...
        </div>
      )}

      {!carregando && produtos.length === 0 && (
        <div id="statusListaVazia" name="statusListaVazia" className="listar-estado-vazio">
          {erroCarregamento
            ? erroCarregamento
            : filtro
              ? 'Nenhum produto encontrado para o filtro aplicado.'
              : 'Nenhum produto cadastrado no momento.'}
        </div>
      )}

      {!carregando && produtos.length > 0 && (
        <div className="listar-tabela-responsiva">
          <table id="tabelaProdutos" name="tabelaProdutos" data-testid="tabelaProdutos" className="listar-tabela">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Código</th>
                <th scope="col">Descrição</th>
                <th scope="col">Preço</th>
                <th scope="col">Qtd. Estoque</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => {
                const quantidade = produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : produto.quantidade;
                return (
                  <tr key={produto.id} id={`linhaProduto_${produto.id}`} name={`linhaProduto_${produto.id}`}>
                    <td>{produto.id}</td>
                    <td><strong>{produto.codigo}</strong></td>
                    <td>{produto.descricao}</td>
                    <td>{formatarMoeda(produto.preco)}</td>
                    <td>{quantidade}</td>
                    <td>
                      <div className="listar-coluna-acoes">
                        <button
                          type="button"
                          id={`btnConsultar_${produto.id}`}
                          name={`btnConsultar_${produto.id}`}
                          data-testid={`btnConsultar_${produto.id}`}
                          className="listar-btn-acao-consultar"
                          onClick={() => aoConsultar(produto.id)}
                          title={`Consultar detalhes do produto ${produto.codigo}`}
                        >
                          Consultar
                        </button>
                        <button
                          type="button"
                          id={`btnEditar_${produto.id}`}
                          name={`btnEditar_${produto.id}`}
                          data-testid={`btnEditar_${produto.id}`}
                          className="listar-btn-acao-editar"
                          onClick={() => aoEditar(produto.id)}
                          title={`Editar produto ${produto.codigo}`}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          id={`btnExcluir_${produto.id}`}
                          name={`btnExcluir_${produto.id}`}
                          data-testid={`btnExcluir_${produto.id}`}
                          className="listar-btn-acao-excluir"
                          onClick={() => aoExcluir(produto.id)}
                          title={`Excluir produto ${produto.codigo}`}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

