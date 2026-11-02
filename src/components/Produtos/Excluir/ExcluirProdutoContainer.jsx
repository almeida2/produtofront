import { useState, useEffect } from 'react';
import { ExcluirProdutoView } from './ExcluirProdutoView';
import { produtoService } from '../../../api/produtoService';

/**
 * Componente Container para Excluir Produtos.
 * Responsável exclusivamente pela lógica de busca, confirmação e exclusão de produtos via API.
 */
export function ExcluirProdutoContainer({
  produtoIdInicial,
  aoNotificarFeedback,
  aoNavegarParaOperacao
}) {
  const [idBusca, setIdBusca] = useState(produtoIdInicial ? String(produtoIdInicial) : '');
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Se produtoIdInicial for informado, carrega assincronamente
  useEffect(() => {
    if (!produtoIdInicial) return;

    let ativo = true;

    produtoService.buscarPorId(String(produtoIdInicial).trim())
      .then((resultado) => {
        if (ativo) {
          setIdBusca(String(produtoIdInicial));
          setProduto(resultado);
          if (aoNotificarFeedback) {
            aoNotificarFeedback({
              tipo: 'info',
              mensagem: `Produto código "${resultado.codigo}" carregado. Confirme para prosseguir com a exclusão.`
            });
          }
        }
      })
      .catch((erro) => {
        if (ativo) {
          setIdBusca(String(produtoIdInicial));
          setProduto(null);
          if (aoNotificarFeedback) {
            aoNotificarFeedback({
              tipo: 'erro',
              mensagem: erro.message || `Não foi possível encontrar o produto com ID "${produtoIdInicial}".`
            });
          }
        }
      });

    return () => {
      ativo = false;
    };
  }, [produtoIdInicial, aoNotificarFeedback]);

  const carregarProdutoManual = async (idParaBuscar) => {
    if (!idParaBuscar || !String(idParaBuscar).trim()) {
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: 'Informe o ID do produto para carregar as informações de exclusão.'
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
          tipo: 'info',
          mensagem: `Produto código "${resultado.codigo}" carregado. Confirme para prosseguir com a exclusão.`
        });
      }
    } catch (erro) {
      setProduto(null);
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: erro.message || `Não foi possível encontrar o produto com ID "${idParaBuscar}".`
        });
      }
    } finally {
      setCarregando(false);
    }
  };

  const aoMudarIdBusca = (evento) => {
    setIdBusca(evento.target.value);
  };

  const aoBuscarPorId = () => {
    carregarProdutoManual(idBusca);
  };

  const aoConfirmarExclusao = async (evento) => {
    evento.preventDefault();

    if (!produto || !produto.id) {
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: 'Nenhum produto selecionado para exclusão.'
        });
      }
      return;
    }

    setCarregando(true);

    try {
      const codigoExcluido = produto.codigo;
      await produtoService.excluir(produto.id);

      setProduto(null);
      setIdBusca('');

      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'sucesso',
          mensagem: `Produto código "${codigoExcluido}" excluído com sucesso.`
        });
      }

      if (aoNavegarParaOperacao) {
        aoNavegarParaOperacao('listar');
      }
    } catch (erro) {
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: erro.message || 'Erro ao tentar excluir o produto.'
        });
      }
    } finally {
      setCarregando(false);
    }
  };

  const aoCancelar = () => {
    if (aoNavegarParaOperacao) {
      aoNavegarParaOperacao('listar');
    }
  };

  return (
    <ExcluirProdutoView
      idBusca={idBusca}
      aoMudarIdBusca={aoMudarIdBusca}
      aoBuscarPorId={aoBuscarPorId}
      produto={produto}
      carregando={carregando}
      aoConfirmarExclusao={aoConfirmarExclusao}
      aoCancelar={aoCancelar}
    />
  );
}
