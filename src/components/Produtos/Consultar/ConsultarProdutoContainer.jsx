import { useState, useEffect } from 'react';
import { ConsultarProdutoView } from './ConsultarProdutoView';
import { produtoService } from '../../../api/produtoService';

/**
 * Componente Container para Consultar Produtos.
 * Responsável exclusivamente pela lógica de busca, estado e exibição dos dados de um produto.
 */
export function ConsultarProdutoContainer({
  produtoIdInicial,
  aoNotificarFeedback,
  aoNavegarParaOperacao
}) {
  const [idPesquisa, setIdPesquisa] = useState(produtoIdInicial ? String(produtoIdInicial) : '');
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Se receber produtoIdInicial, busca assincronamente
  useEffect(() => {
    if (!produtoIdInicial) return;

    let ativo = true;

    produtoService.buscarPorId(String(produtoIdInicial).trim())
      .then((resultado) => {
        if (ativo) {
          setIdPesquisa(String(produtoIdInicial));
          setProduto(resultado);
          if (aoNotificarFeedback) {
            aoNotificarFeedback({
              tipo: 'sucesso',
              mensagem: `Consulta realizada com sucesso! Produto "${resultado.codigo}" encontrado.`
            });
          }
        }
      })
      .catch((erro) => {
        if (ativo) {
          setIdPesquisa(String(produtoIdInicial));
          setProduto(null);
          if (aoNotificarFeedback) {
            aoNotificarFeedback({
              tipo: 'erro',
              mensagem: erro.message || `Produto com ID "${produtoIdInicial}" não encontrado.`
            });
          }
        }
      });

    return () => {
      ativo = false;
    };
  }, [produtoIdInicial, aoNotificarFeedback]);

  const executarConsultaManual = async (idParaBuscar) => {
    if (!idParaBuscar || !String(idParaBuscar).trim()) {
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: 'Informe o ID do produto para realizar a consulta.'
        });
      }
      return;
    }

    setCarregando(true);
    try {
      const resultado = await produtoService.buscarPorId(idParaBuscar.trim());
      setProduto(resultado);
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'sucesso',
          mensagem: `Consulta realizada com sucesso! Produto "${resultado.codigo}" encontrado.`
        });
      }
    } catch (erro) {
      setProduto(null);
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: erro.message || `Produto com ID "${idParaBuscar}" não encontrado.`
        });
      }
    } finally {
      setCarregando(false);
    }
  };

  const aoMudarIdPesquisa = (evento) => {
    setIdPesquisa(evento.target.value);
  };

  const aoPesquisar = (evento) => {
    evento.preventDefault();
    executarConsultaManual(idPesquisa);
  };

  const aoLimpar = () => {
    setIdPesquisa('');
    setProduto(null);
  };

  const aoEditar = (id) => {
    if (aoNavegarParaOperacao) {
      aoNavegarParaOperacao('editar', id);
    }
  };

  const aoExcluir = (id) => {
    if (aoNavegarParaOperacao) {
      aoNavegarParaOperacao('excluir', id);
    }
  };

  return (
    <ConsultarProdutoView
      idPesquisa={idPesquisa}
      aoMudarIdPesquisa={aoMudarIdPesquisa}
      aoPesquisar={aoPesquisar}
      aoLimpar={aoLimpar}
      produto={produto}
      carregando={carregando}
      aoEditar={aoEditar}
      aoExcluir={aoExcluir}
    />
  );
}
