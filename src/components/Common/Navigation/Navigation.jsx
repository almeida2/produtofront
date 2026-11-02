import './Navigation.css';

/**
 * Componente de Navegação para alternar entre as operações do CRUD de Produtos.
 * Identificado rigorosamente com atributos id e name semânticos.
 */
export function Navigation({ operacaoAtiva, aoMudarOperacao }) {
  const operacoes = [
    { id: 'btnNavCadastrar', name: 'btnNavCadastrar', valor: 'cadastrar', label: 'Cadastrar' },
    { id: 'btnNavListar', name: 'btnNavListar', valor: 'listar', label: 'Listar Produtos' },
    { id: 'btnNavConsultar', name: 'btnNavConsultar', valor: 'consultar', label: 'Consultar' },
    { id: 'btnNavAtualizar', name: 'btnNavAtualizar', valor: 'editar', label: 'Atualizar' },
    { id: 'btnNavExcluir', name: 'btnNavExcluir', valor: 'excluir', label: 'Excluir' }
  ];

  return (
    <nav id="navegacaoOperacoes" name="navegacaoOperacoes" className="navegacao-container" aria-label="Operações de Produtos">
      <div className="navegacao-lista">
        {operacoes.map((item) => {
          const ativo = operacaoAtiva === item.valor;
          return (
            <button
              key={item.valor}
              type="button"
              id={item.id}
              name={item.name}
              data-testid={item.id}
              className={`navegacao-botao ${ativo ? 'navegacao-botao-ativo' : ''}`}
              onClick={() => aoMudarOperacao(item.valor)}
              aria-current={ativo ? 'page' : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

