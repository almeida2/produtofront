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

  const aoMudarOperacao = (novaOperacao, idProduto = null) => {
    setOperacaoAtiva(novaOperacao);
    setProdutoSelecionadoId(idProduto);
    // Apaga a mensagem de feedback em vermelho/erro ao selecionar qualquer uma das opções
    setFeedback(null);
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

      {/* Navegação entre as operações */}
      <Navigation
        operacaoAtiva={operacaoAtiva}
        aoMudarOperacao={(op) => aoMudarOperacao(op, null)}
      />

      {/* Conteúdo Principal da Operação Ativa */}
      <main id="conteudoPrincipal" name="conteudoPrincipal" className="produtos-conteudo-principal">
        {operacaoAtiva === 'cadastrar' && (
          <CadastrarProdutosContainer
            aoNotificarFeedback={aoNotificarFeedback}
            aoSucessoCadastro={() => {
              // Mantém na tela com feedback ativo
            }}
          />
        )}

        {operacaoAtiva === 'listar' && (
          <ListarProdutosContainer
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoMudarOperacao}
          />
        )}

        {operacaoAtiva === 'consultar' && (
          <ConsultarProdutoContainer
            produtoIdInicial={produtoSelecionadoId}
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoMudarOperacao}
          />
        )}

        {operacaoAtiva === 'editar' && (
          <EditarProdutoContainer
            produtoIdInicial={produtoSelecionadoId}
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoMudarOperacao}
          />
        )}

        {operacaoAtiva === 'excluir' && (
          <ExcluirProdutoContainer
            produtoIdInicial={produtoSelecionadoId}
            aoNotificarFeedback={aoNotificarFeedback}
            aoNavegarParaOperacao={aoMudarOperacao}
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

