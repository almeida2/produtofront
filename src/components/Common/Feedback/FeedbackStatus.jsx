import './FeedbackStatus.css';

/**
 * Componente de Feedback fixado e centralizado na parte inferior da tela,
 * exibindo o status da última transação realizada enquanto o usuário permanece na tela.
 *
 * @param {{
 *  feedback: {
 *    tipo: 'sucesso' | 'erro' | 'info' | '',
 *    mensagem: string
 *  } | null,
 *  aoFechar?: () => void
 * }} props
 */
export function FeedbackStatus({ feedback, aoFechar }) {
  if (!feedback || !feedback.mensagem) {
    return null;
  }

  const classeTipo = feedback.tipo === 'erro'
    ? 'feedback-erro'
    : feedback.tipo === 'sucesso'
      ? 'feedback-sucesso'
      : 'feedback-info';

  return (
    <div
      id="feedbackStatus"
      name="feedbackStatus"
      data-testid="feedbackStatus"
      role="status"
      aria-live="polite"
      className={`feedback-container-inferior ${classeTipo}`}
    >
      <div className="feedback-conteudo">
        <span className="feedback-icone" aria-hidden="true">
          {feedback.tipo === 'erro' ? '⚠️' : feedback.tipo === 'sucesso' ? '✅' : 'ℹ️'}
        </span>
        <span id="feedbackMensagem" name="feedbackMensagem" className="feedback-mensagem-texto">
          {feedback.mensagem}
        </span>
      </div>

      {aoFechar && (
        <button
          type="button"
          id="btnFecharFeedback"
          name="btnFecharFeedback"
          data-testid="btnFecharFeedback"
          className="feedback-btn-fechar"
          onClick={aoFechar}
          title="Fechar mensagem"
          aria-label="Fechar mensagem"
        >
          ✕
        </button>
      )}
    </div>
  );
}

