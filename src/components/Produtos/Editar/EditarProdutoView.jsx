import './EditarProdutoStyles.css';

/**
 * Componente Presentational para Editar/Atualizar Produtos.
 * Responsável apenas pela renderização visual do formulário de atualização e captura de eventos.
 */
export function EditarProdutoView({
  idBusca,
  aoMudarIdBusca,
  aoBuscarPorId,
  formData,
  erros,
  carregando,
  aoMudarCampo,
  aoSalvar,
  aoCancelar,
  produtoCarregado
}) {
  return (
    <section className="editar-container" aria-labelledby="tituloOperacao">
      <h3 id="tituloOperacao" name="tituloOperacao" data-testid="tituloOperacao" className="editar-titulo-operacao">
        Atualizar
      </h3>

      {/* Busca rápida de ID para carregar dados se nenhum produto estiver aberto */}
      <div className="editar-busca-topo">
        <div className="editar-grupo-busca">
          <label htmlFor="idBusca" className="editar-rotulo">
            Carregar Produto por ID para Atualização:
          </label>
          <input
            type="text"
            id="idBusca"
            name="idBusca"
            data-testid="idBusca"
            className="editar-input"
            value={idBusca}
            onChange={aoMudarIdBusca}
            placeholder="Digite o ID para carregar..."
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          id="btnBuscar"
          name="btnBuscar"
          data-testid="btnBuscar"
          className="editar-btn-buscar"
          onClick={aoBuscarPorId}
          disabled={carregando}
        >
          {carregando ? 'Buscando...' : 'Carregar'}
        </button>
      </div>

      {!produtoCarregado && (
        <div id="avisoCarregarProduto" name="avisoCarregarProduto" className="editar-aviso-selecao">
          Informe o ID do produto acima ou selecione um produto na aba &quot;Listar Produtos&quot; para editar.
        </div>
      )}

      {produtoCarregado && (
        <form
          id="formEditarProduto"
          name="formEditarProduto"
          data-testid="formEditarProduto"
          className="editar-formulario"
          onSubmit={aoSalvar}
          noValidate
        >
          <div className="editar-grid">
            {/* ID - Gerado automaticamente, apenas leitura */}
            <div className="editar-grupo">
              <label htmlFor="id" className="editar-rotulo">
                ID do Produto (Apenas Leitura)
              </label>
              <input
                type="text"
                id="id"
                name="id"
                data-testid="id"
                className="editar-input editar-input-desabilitado"
                value={formData.id}
                readOnly
                disabled
                title="ID gerado automaticamente pelo servidor"
              />
            </div>

            {/* Código */}
            <div className="editar-grupo">
              <label htmlFor="codigo" className="editar-rotulo">
                Código <span className="editar-obrigatorio">*</span>
              </label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                data-testid="codigo"
                className={`editar-input ${erros.codigo ? 'editar-input-erro' : ''}`}
                value={formData.codigo}
                onChange={aoMudarCampo}
                placeholder="Ex: PROD01"
                maxLength={10}
                autoComplete="off"
                aria-required="true"
                aria-invalid={!!erros.codigo}
                aria-describedby={erros.codigo ? 'erroCodigoEdicao' : undefined}
              />
              {erros.codigo && (
                <span id="erroCodigoEdicao" name="erroCodigoEdicao" data-testid="erroCodigoEdicao" className="editar-mensagem-erro">
                  {erros.codigo}
                </span>
              )}
            </div>

            {/* Preço */}
            <div className="editar-grupo">
              <label htmlFor="preco" className="editar-rotulo">
                Preço (R$) <span className="editar-obrigatorio">*</span>
              </label>
              <input
                type="text"
                id="preco"
                name="preco"
                data-testid="preco"
                className={`editar-input ${erros.preco ? 'editar-input-erro' : ''}`}
                value={formData.preco}
                onChange={aoMudarCampo}
                placeholder="R$ 0,00"
                aria-required="true"
                aria-invalid={!!erros.preco}
                aria-describedby={erros.preco ? 'erroPrecoEdicao' : undefined}
              />
              {erros.preco && (
                <span id="erroPrecoEdicao" name="erroPrecoEdicao" data-testid="erroPrecoEdicao" className="editar-mensagem-erro">
                  {erros.preco}
                </span>
              )}
            </div>

            {/* Quantidade em Estoque */}
            <div className="editar-grupo">
              <label htmlFor="quantidadeEstoque" className="editar-rotulo">
                Quantidade em Estoque <span className="editar-obrigatorio">*</span>
              </label>
              <input
                type="number"
                id="quantidadeEstoque"
                name="quantidadeEstoque"
                data-testid="quantidadeEstoque"
                className={`editar-input ${erros.quantidadeEstoque ? 'editar-input-erro' : ''}`}
                value={formData.quantidadeEstoque}
                onChange={aoMudarCampo}
                placeholder="Ex: 10"
                min="1"
                step="1"
                aria-required="true"
                aria-invalid={!!erros.quantidadeEstoque}
                aria-describedby={erros.quantidadeEstoque ? 'erroQuantidadeEstoqueEdicao' : undefined}
              />
              {erros.quantidadeEstoque && (
                <span id="erroQuantidadeEstoqueEdicao" name="erroQuantidadeEstoqueEdicao" data-testid="erroQuantidadeEstoqueEdicao" className="editar-mensagem-erro">
                  {erros.quantidadeEstoque}
                </span>
              )}
            </div>

            {/* Descrição */}
            <div className="editar-grupo editar-campo-completo">
              <label htmlFor="descricao" className="editar-rotulo">
                Descrição <span className="editar-obrigatorio">*</span>
              </label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                data-testid="descricao"
                className={`editar-input ${erros.descricao ? 'editar-input-erro' : ''}`}
                value={formData.descricao}
                onChange={aoMudarCampo}
                placeholder="Descrição detalhada do produto"
                maxLength={200}
                aria-required="true"
                aria-invalid={!!erros.descricao}
                aria-describedby={erros.descricao ? 'erroDescricaoEdicao' : undefined}
              />
              {erros.descricao && (
                <span id="erroDescricaoEdicao" name="erroDescricaoEdicao" data-testid="erroDescricaoEdicao" className="editar-mensagem-erro">
                  {erros.descricao}
                </span>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="editar-acoes">
            <button
              type="button"
              id="btnCancelar"
              name="btnCancelar"
              data-testid="btnCancelar"
              className="editar-btn-cancelar"
              onClick={aoCancelar}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="btnSalvar"
              name="btnSalvar"
              data-testid="btnSalvar"
              className="editar-btn-salvar"
              disabled={carregando}
            >
              {carregando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

