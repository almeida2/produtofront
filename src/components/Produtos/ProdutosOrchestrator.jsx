import { useState } from 'react';
import { Header } from '../Common/Header/Header';
import { Navigation } from '../Common/Navigation/Navigation';
import { FeedbackStatus } from '../Common/Feedback/FeedbackStatus';

import { CadastrarProdutosContainer } from './Cadastrar';
import { ListarProdutosContainer } from './Listar';
import { ConsultarProdutoContainer } from './Consultar';
import { EditarProdutoContainer } from './Editar';
import { ExcluirProdutoContainer } from './Excluir';

import './ProdutosOrchestrator.css';

/**
 * Orquestrador do Módulo de Produtos.
 * Gerencia a navegação entre as operações CRUD (Cadastrar, Listar, Consultar, Atualizar, Excluir),
 * o compartilhamento do ID de produto selecionado e a persistência da mensagem de feedback.
 */
export function ProdutosOrchestrator() {
  const [operacaoAtiva, setOperacaoAtiva] = useState('listar');
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  /**
   * Navegação disparada pelos BOTÕES do menu (Cadastrar, Listar, Consultar, Atualizar, Excluir).
   * Limpa o feedback, pois o usuário está iniciando intencionalmente uma nova operação.
   */
  const aoNavegar = (novaOperacao) => {
    setFeedback(null);
    setOperacaoAtiva(novaOperacao);
    setProdutoSelecionadoId(null);
  };

  /**
   * Navegação programática disparada INTERNAMENTE pelos containers após o resultado de uma operação
   * (ex: redirecionar para Listar após excluir, ou abrir Editar a partir da Listagem).
   * NÃO limpa o feedback, para preservar a mensagem de sucesso ou erro da operação concluída.
   */
  const aoNavegarParaOperacao = (novaOperacao, idProduto = null) => {
    setOperacaoAtiva(novaOperacao);
    setProdutoSelecionadoId(idProduto);
  };

  const aoNotificarFeedback = (novoFeedback) => {
    setFeedback(novoFeedback);
  };

  const aoFecharFeedback = () => {
    setFeedback(null);
  };

  return (
    <div id="moduloProdutos" name="moduloProdutos" className="produtos-modulo-container">
      {/* 2. Header & Layout Geral: Relógio no canto esquerdo e Data no canto direito */}
      <Header />

      {/* Navegação entre as operações - usa aoNavegar para limpar feedback ao trocar de tela */}
      <Navigation
        operacaoAtiva={operacaoAtiva}
        aoMudarOperacao={aoNavegar}
      />

      {/* Conteúdo Principal da Operação Ativa */}
      <main id="conteudoPrincipal" name="conteudoPrincipal" className="produtos-conteudo-principal">
        {operacaoAtiva === 'cadastrar' && (
          <CadastrarProdutosContainer
            aoNotificarFeedback={aoNotificarFeedback}
            aoSucessoCadastro={() => {
              // Mantém na tela de cadastro com o feedback de sucesso visível
            }}
          />
        )}

        {operacaoAtiva === 'listar' && (
          <ListarProdutosContainer
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoNavegarParaOperacao}
          />
        )}

        {operacaoAtiva === 'consultar' && (
          <ConsultarProdutoContainer
            produtoIdInicial={produtoSelecionadoId}
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoNavegarParaOperacao}
          />
        )}

        {operacaoAtiva === 'editar' && (
          <EditarProdutoContainer
            produtoIdInicial={produtoSelecionadoId}
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoNavegarParaOperacao}
          />
        )}

        {operacaoAtiva === 'excluir' && (
          <ExcluirProdutoContainer
            produtoIdInicial={produtoSelecionadoId}
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoNavegarParaOperacao}
          />
        )}
      </main>

      {/* 4. Feedback centralizado na parte de baixo da tela */}
      <FeedbackStatus
        feedback={feedback}
        aoFechar={aoFecharFeedback}
      />
    </div>
  );
}

