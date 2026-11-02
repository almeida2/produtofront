import './CadastrarProdutosStyles.css';

/**
 * Componente Presentational para Cadastrar Produtos.
 * Responsável apenas pela renderização visual e captura de eventos.
 */
export function CadastrarProdutosView({
  formData,
  erros,
  carregando,
  aoMudarCampo,
  aoEnviar,
  aoLimpar
}) {
  return (
    <section className="cadastrar-container" aria-labelledby="tituloOperacao">
      <h3 id="tituloOperacao" name="tituloOperacao" data-testid="tituloOperacao" className="cadastrar-titulo-operacao">
        Cadastrar
      </h3>

      <form
        id="formCadastrarProduto"
        name="formCadastrarProduto"
        data-testid="formCadastrarProduto"
        className="cadastrar-formulario"
        onSubmit={aoEnviar}
        noValidate
      >
        <div className="cadastrar-grid">
          {/* Código */}
          <div className="cadastrar-grupo">
            <label htmlFor="codigo" className="cadastrar-rotulo">
              Código <span className="cadastrar-obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              data-testid="codigo"
              className={`cadastrar-input ${erros.codigo ? 'cadastrar-input-erro' : ''}`}
              value={formData.codigo}
              onChange={aoMudarCampo}
              placeholder="Ex: PROD01"
              maxLength={10}
              autoComplete="off"
              aria-required="true"
              aria-invalid={!!erros.codigo}
              aria-describedby={erros.codigo ? 'erroCodigo' : undefined}
            />
            {erros.codigo && (
              <span id="erroCodigo" name="erroCodigo" data-testid="erroCodigo" className="cadastrar-mensagem-erro">
                {erros.codigo}
              </span>
            )}
          </div>

          {/* Quantidade em Estoque */}
          <div className="cadastrar-grupo">
            <label htmlFor="quantidadeEstoque" className="cadastrar-rotulo">
              Quantidade em Estoque <span className="cadastrar-obrigatorio">*</span>
            </label>
            <input
              type="number"
              id="quantidadeEstoque"
              name="quantidadeEstoque"
              data-testid="quantidadeEstoque"
              className={`cadastrar-input ${erros.quantidadeEstoque ? 'cadastrar-input-erro' : ''}`}
              value={formData.quantidadeEstoque}
              onChange={aoMudarCampo}
              placeholder="Ex: 50"
              min="1"
              step="1"
              aria-required="true"
              aria-invalid={!!erros.quantidadeEstoque}
              aria-describedby={erros.quantidadeEstoque ? 'erroQuantidadeEstoque' : undefined}
            />
            {erros.quantidadeEstoque && (
              <span id="erroQuantidadeEstoque" name="erroQuantidadeEstoque" data-testid="erroQuantidadeEstoque" className="cadastrar-mensagem-erro">
                {erros.quantidadeEstoque}
              </span>
            )}
          </div>

          {/* Preço */}
          <div className="cadastrar-grupo cadastrar-campo-completo">
            <label htmlFor="preco" className="cadastrar-rotulo">
              Preço (R$) <span className="cadastrar-obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="preco"
              name="preco"
              data-testid="preco"
              className={`cadastrar-input ${erros.preco ? 'cadastrar-input-erro' : ''}`}
              value={formData.preco}
              onChange={aoMudarCampo}
              placeholder="R$ 0,00"
              aria-required="true"
              aria-invalid={!!erros.preco}
              aria-describedby={erros.preco ? 'erroPreco' : undefined}
            />
            {erros.preco && (
              <span id="erroPreco" name="erroPreco" data-testid="erroPreco" className="cadastrar-mensagem-erro">
                {erros.preco}
              </span>
            )}
          </div>

          {/* Descrição */}
          <div className="cadastrar-grupo cadastrar-campo-completo">
            <label htmlFor="descricao" className="cadastrar-rotulo">
              Descrição <span className="cadastrar-obrigatorio">*</span>
            </label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              data-testid="descricao"
              className={`cadastrar-input ${erros.descricao ? 'cadastrar-input-erro' : ''}`}
              value={formData.descricao}
              onChange={aoMudarCampo}
              placeholder="Descrição do produto (de 3 a 200 caracteres)"
              maxLength={200}
              aria-required="true"
              aria-invalid={!!erros.descricao}
              aria-describedby={erros.descricao ? 'erroDescricao' : undefined}
            />
            {erros.descricao && (
              <span id="erroDescricao" name="erroDescricao" data-testid="erroDescricao" className="cadastrar-mensagem-erro">
                {erros.descricao}
              </span>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="cadastrar-acoes">
          <button
            type="button"
            id="btnLimpar"
            name="btnLimpar"
            data-testid="btnLimpar"
            className="cadastrar-btn-limpar"
            onClick={aoLimpar}
            disabled={carregando}
          >
            Limpar
          </button>
          <button
            type="submit"
            id="btnSalvar"
            name="btnSalvar"
            data-testid="btnSalvar"
            className="cadastrar-btn-salvar"
            disabled={carregando}
          >
            {carregando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </section>
  );
}

