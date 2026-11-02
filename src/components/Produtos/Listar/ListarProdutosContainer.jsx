import { useState, useEffect, useMemo } from 'react';
import { ListarProdutosView } from './ListarProdutosView';
import { produtoService } from '../../../api/produtoService';

/**
 * Componente Container para Listar Produtos.
 * Responsável exclusivamente pela lógica de negócio, busca e estado da listagem.
 */
export function ListarProdutosContainer({
  aoNotificarFeedback,
  aoNavegarParaOperacao
}) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [erroCarregamento, setErroCarregamento] = useState('');

  useEffect(() => {
    let ativo = true;

    produtoService.listar()
      .then((lista) => {
        if (ativo) {
          setProdutos(Array.isArray(lista) ? lista : []);
          setCarregando(false);
          setErroCarregamento('');
        }
      })
      .catch((erro) => {
        if (ativo) {
          setCarregando(false);
          setErroCarregamento(erro.message || 'Erro ao carregar a lista de produtos.');
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  const carregarProdutos = async () => {
    setCarregando(true);
    setErroCarregamento('');
    try {
      const lista = await produtoService.listar();
      setProdutos(Array.isArray(lista) ? lista : []);
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'sucesso',
          mensagem: 'Lista de produtos atualizada com sucesso.'
        });
      }
    } catch (erro) {
      const msg = erro.message || 'Erro ao carregar a lista de produtos.';
      setErroCarregamento(msg);
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: msg
        });
      }
    } finally {
      setCarregando(false);
    }
  };

  const aoMudarFiltro = (evento) => {
    setFiltro(evento.target.value);
  };

  const produtosFiltrados = useMemo(() => {
    if (!filtro.trim()) {
      return produtos;
    }
    const termo = filtro.toLowerCase().trim();
    return produtos.filter((p) => {
      const codigoMatch = p.codigo && p.codigo.toLowerCase().includes(termo);
      const descMatch = p.descricao && p.descricao.toLowerCase().includes(termo);
      const idMatch = p.id && String(p.id).toLowerCase().includes(termo);
      return codigoMatch || descMatch || idMatch;
    });
  }, [produtos, filtro]);

  const aoNovo = () => {
    if (aoNavegarParaOperacao) {
      aoNavegarParaOperacao('cadastrar');
    }
  };

  const aoConsultar = (id) => {
    if (aoNavegarParaOperacao) {
      aoNavegarParaOperacao('consultar', id);
    }
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
    <ListarProdutosView
      produtos={produtosFiltrados}
      carregando={carregando}
      filtro={filtro}
      erroCarregamento={erroCarregamento}
      aoMudarFiltro={aoMudarFiltro}
      aoRecarregar={carregarProdutos}
      aoNovo={aoNovo}
      aoConsultar={aoConsultar}
      aoEditar={aoEditar}
      aoExcluir={aoExcluir}
    />
  );
}
