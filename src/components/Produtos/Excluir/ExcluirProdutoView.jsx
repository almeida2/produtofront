import { formatarMoeda } from '../../../utils/formatters';
import './ExcluirProdutoStyles.css';

/**
 * Componente Presentational para Excluir Produtos.
 * Responsável pela visualização da confirmação de exclusão e captura de eventos.
 */
export function ExcluirProdutoView({
  idBusca,
  aoMudarIdBusca,
  aoBuscarPorId,
  produto,
  carregando,
  aoConfirmarExclusao,
  aoCancelar
}) {
  const quantidade = produto ? (produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : produto.quantidade) : '';

  return (
    <section className="excluir-container" aria-labelledby="tituloOperacao">
      <h3 id="tituloOperacao" name="tituloOperacao" data-testid="tituloOperacao" className="excluir-titulo-operacao">
        Excluir
      </h3>

      {/* Busca do produto a ser excluído caso nenhum esteja selecionado */}
      <div className="excluir-busca-topo">
        <div className="excluir-grupo-busca">
          <label htmlFor="idBuscaExcluir" className="excluir-rotulo">
            Carregar Produto por ID para Exclusão:
          </label>
          <input
            type="text"
            id="idBuscaExcluir"
            name="idBuscaExcluir"
            data-testid="idBuscaExcluir"
            className="excluir-input"
            value={idBusca}
            onChange={aoMudarIdBusca}
            placeholder="Digite o ID do produto para exclusão..."
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          id="btnBuscar"
          name="btnBuscar"
          data-testid="btnBuscar"
          className="excluir-btn-buscar"
          onClick={aoBuscarPorId}
          disabled={carregando}
        >
          {carregando ? 'Buscando...' : 'Carregar'}
        </button>
      </div>

      {!produto && (
        <div id="avisoCarregarExclusao" name="avisoCarregarExclusao" className="excluir-aviso-selecao">
          Informe o ID acima ou selecione o botão &quot;Excluir&quot; de um produto na lista.
        </div>
      )}

      {produto && (
        <form
          id="formExcluirProduto"
          name="formExcluirProduto"
          data-testid="formExcluirProduto"
          className="excluir-card-confirmacao"
          onSubmit={aoConfirmarExclusao}
        >
          <div className="excluir-aviso-alerta" role="alert">
            <span className="excluir-aviso-icone">⚠️</span>
            <span>Atenção: Esta ação é irreversível. Deseja realmente excluir este produto?</span>
          </div>

          <div className="excluir-grid-dados">
            {/* ID */}
            <div className="excluir-grupo-dado">
              <label htmlFor="id" className="excluir-rotulo">
                ID do Produto
              </label>
              <input
                type="text"
                id="id"
                name="id"
                data-testid="id"
                className="excluir-input excluir-input-readonly"
                value={produto.id || ''}
                readOnly
              />
            </div>

            {/* Código */}
            <div className="excluir-grupo-dado">
              <label htmlFor="codigo" className="excluir-rotulo">
                Código
              </label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                data-testid="codigo"
                className="excluir-input excluir-input-readonly"
                value={produto.codigo || ''}
                readOnly
              />
            </div>

            {/* Quantidade em Estoque */}
            <div className="excluir-grupo-dado">
              <label htmlFor="quantidadeEstoque" className="excluir-rotulo">
                Quantidade em Estoque
              </label>
              <input
                type="text"
                id="quantidadeEstoque"
                name="quantidadeEstoque"
                data-testid="quantidadeEstoque"
                className="excluir-input excluir-input-readonly"
                value={quantidade}
                readOnly
              />
            </div>

            {/* Preço */}
            <div className="excluir-grupo-dado">
              <label htmlFor="preco" className="excluir-rotulo">
                Preço
              </label>
              <input
                type="text"
                id="preco"
                name="preco"
                data-testid="preco"
                className="excluir-input excluir-input-readonly"
                value={formatarMoeda(produto.preco)}
                readOnly
              />
            </div>

            {/* Descrição */}
            <div className="excluir-grupo-dado excluir-campo-completo">
              <label htmlFor="descricao" className="excluir-rotulo">
                Descrição
              </label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                data-testid="descricao"
                className="excluir-input excluir-input-readonly"
                value={produto.descricao || ''}
                readOnly
              />
            </div>
          </div>

          {/* Botões de Confirmação */}
          <div className="excluir-acoes">
            <button
              type="button"
              id="btnCancelar"
              name="btnCancelar"
              data-testid="btnCancelar"
              className="excluir-btn-cancelar"
              onClick={aoCancelar}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="btnExcluir"
              name="btnExcluir"
              data-testid="btnExcluir"
              className="excluir-btn-confirmar"
              disabled={carregando}
            >
              {carregando ? 'Excluindo...' : 'Confirmar Exclusão'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

