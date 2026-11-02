import { formatarMoeda } from '../../../utils/formatters';
import './ConsultarProdutoStyles.css';

/**
 * Componente Presentational para Consultar Produtos.
 * Responsável pela renderização do formulário de busca e visualização dos dados do produto consultado.
 */
export function ConsultarProdutoView({
  idPesquisa,
  aoMudarIdPesquisa,
  aoPesquisar,
  aoLimpar,
  produto,
  carregando,
  aoEditar,
  aoExcluir
}) {
  const quantidade = produto ? (produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : produto.quantidade) : '';

  return (
    <section className="consultar-container" aria-labelledby="tituloOperacao">
      <h3 id="tituloOperacao" name="tituloOperacao" data-testid="tituloOperacao" className="consultar-titulo-operacao">
        Consultar
      </h3>

      {/* Formulário de Busca por ID */}
      <form
        id="formConsultarProduto"
        name="formConsultarProduto"
        data-testid="formConsultarProduto"
        className="consultar-formulario-busca"
        onSubmit={aoPesquisar}
      >
        <div className="consultar-grupo-busca">
          <label htmlFor="idPesquisa" className="consultar-rotulo">
            Buscar Produto por ID:
          </label>
          <input
            type="text"
            id="idPesquisa"
            name="idPesquisa"
            data-testid="idPesquisa"
            className="consultar-input"
            value={idPesquisa}
            onChange={aoMudarIdPesquisa}
            placeholder="Digite o ID do produto..."
            autoComplete="off"
          />
        </div>

        <div className="consultar-acoes-busca">
          <button
            type="submit"
            id="btnConsultar"
            name="btnConsultar"
            data-testid="btnConsultar"
            className="consultar-btn-consultar"
            disabled={carregando}
          >
            {carregando ? 'Consultando...' : 'Consultar'}
          </button>
          <button
            type="button"
            id="btnLimpar"
            name="btnLimpar"
            data-testid="btnLimpar"
            className="consultar-btn-limpar"
            onClick={aoLimpar}
            disabled={carregando}
          >
            Limpar
          </button>
        </div>
      </form>

      {/* Estado Carregando */}
      {carregando && (
        <div id="statusCarregandoConsulta" name="statusCarregandoConsulta" className="consultar-carregando">
          Consultando dados do produto...
        </div>
      )}

      {/* Detalhes do Produto Encontrado */}
      {produto && !carregando && (
        <div id="cardDetalhesProduto" name="cardDetalhesProduto" className="consultar-card-detalhes">
          <h4 className="consultar-titulo-detalhes">Detalhes do Produto</h4>

          <div className="consultar-grid-detalhes">
            {/* ID */}
            <div className="consultar-grupo-campo">
              <label htmlFor="id" className="consultar-rotulo">
                ID do Produto
              </label>
              <input
                type="text"
                id="id"
                name="id"
                data-testid="id"
                className="consultar-input consultar-input-readonly"
                value={produto.id || ''}
                readOnly
              />
            </div>

            {/* Código */}
            <div className="consultar-grupo-campo">
              <label htmlFor="codigo" className="consultar-rotulo">
                Código
              </label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                data-testid="codigo"
                className="consultar-input consultar-input-readonly"
                value={produto.codigo || ''}
                readOnly
              />
            </div>

            {/* Quantidade em Estoque */}
            <div className="consultar-grupo-campo">
              <label htmlFor="quantidadeEstoque" className="consultar-rotulo">
                Quantidade em Estoque
              </label>
              <input
                type="text"
                id="quantidadeEstoque"
                name="quantidadeEstoque"
                data-testid="quantidadeEstoque"
                className="consultar-input consultar-input-readonly"
                value={quantidade}
                readOnly
              />
            </div>

            {/* Preço */}
            <div className="consultar-grupo-campo">
              <label htmlFor="preco" className="consultar-rotulo">
                Preço
              </label>
              <input
                type="text"
                id="preco"
                name="preco"
                data-testid="preco"
                className="consultar-input consultar-input-readonly"
                value={formatarMoeda(produto.preco)}
                readOnly
              />
            </div>

            {/* Descrição */}
            <div className="consultar-grupo-campo consultar-campo-completo">
              <label htmlFor="descricao" className="consultar-rotulo">
                Descrição
              </label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                data-testid="descricao"
                className="consultar-input consultar-input-readonly"
                value={produto.descricao || ''}
                readOnly
              />
            </div>
          </div>

          <div className="consultar-acoes-detalhes">
            <button
              type="button"
              id="btnEditar"
              name="btnEditar"
              data-testid="btnEditar"
              className="consultar-btn-editar"
              onClick={() => aoEditar(produto.id)}
            >
              Editar este Produto
            </button>
            <button
              type="button"
              id="btnExcluir"
              name="btnExcluir"
              data-testid="btnExcluir"
              className="consultar-btn-excluir"
              onClick={() => aoExcluir(produto.id)}
            >
              Excluir este Produto
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

