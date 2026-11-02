import { useState, useEffect } from 'react';
import { EditarProdutoView } from './EditarProdutoView';
import { produtoService } from '../../../api/produtoService';
import { validarProduto } from '../../../utils/validators';
import { desformatarMoeda, formatarMoeda, mascararMoedaInput } from '../../../utils/formatters';

const FORM_INICIAL = {
  id: '',
  codigo: '',
  descricao: '',
  preco: '',
  quantidadeEstoque: ''
};

/**
 * Componente Container para Editar/Atualizar Produtos.
 * Responsável exclusivamente pela lógica de negócio, busca e atualização do produto via API.
 */
export function EditarProdutoContainer({
  produtoIdInicial,
  aoNotificarFeedback,
  aoNavegarParaOperacao
}) {
  const [idBusca, setIdBusca] = useState(produtoIdInicial ? String(produtoIdInicial) : '');
  const [formData, setFormData] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [produtoCarregado, setProdutoCarregado] = useState(false);

  // Se produtoIdInicial for passado pelas props, carrega assincronamente
  useEffect(() => {
    if (!produtoIdInicial) return;

    let ativo = true;

    produtoService.buscarPorId(String(produtoIdInicial).trim())
      .then((produto) => {
        if (ativo) {
          const qtd = produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : produto.quantidade;
          setIdBusca(String(produtoIdInicial));
          setFormData({
            id: produto.id || produtoIdInicial,
            codigo: produto.codigo || '',
            descricao: produto.descricao || '',
            preco: formatarMoeda(produto.preco),
            quantidadeEstoque: qtd !== undefined && qtd !== null ? String(qtd) : ''
          });
          setProdutoCarregado(true);
          setErros({});

          if (aoNotificarFeedback) {
            aoNotificarFeedback({
              tipo: 'sucesso',
              mensagem: `Dados do produto "${produto.codigo}" carregados para edição.`
            });
          }
        }
      })
      .catch((erro) => {
        if (ativo) {
          setIdBusca(String(produtoIdInicial));
          setProdutoCarregado(false);
          setFormData(FORM_INICIAL);
          if (aoNotificarFeedback) {
            aoNotificarFeedback({
              tipo: 'erro',
              mensagem: erro.message || `Não foi possível carregar o produto com ID "${produtoIdInicial}".`
            });
          }
        }
      });

    return () => {
      ativo = false;
    };
  }, [produtoIdInicial, aoNotificarFeedback]);

  const carregarDadosProdutoManual = async (idParaBuscar) => {
    if (!idParaBuscar || !String(idParaBuscar).trim()) {
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: 'Informe o ID do produto para carregar os dados de atualização.'
        });
      }
      return;
    }

    setCarregando(true);
    setErros({});

    try {
      const produto = await produtoService.buscarPorId(idParaBuscar.trim());
      const qtd = produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : produto.quantidade;

      setFormData({
        id: produto.id || idParaBuscar,
        codigo: produto.codigo || '',
        descricao: produto.descricao || '',
        preco: formatarMoeda(produto.preco),
        quantidadeEstoque: qtd !== undefined && qtd !== null ? String(qtd) : ''
      });
      setProdutoCarregado(true);

      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'sucesso',
          mensagem: `Dados do produto "${produto.codigo}" carregados para edição.`
        });
      }
    } catch (erro) {
      setProdutoCarregado(false);
      setFormData(FORM_INICIAL);
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: erro.message || `Não foi possível carregar o produto com ID "${idParaBuscar}".`
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
    carregarDadosProdutoManual(idBusca);
  };

  const aoMudarCampo = (evento) => {
    const { name, value } = evento.target;

    let valorProcessado = value;
    if (name === 'preco') {
      valorProcessado = mascararMoedaInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: valorProcessado
    }));

    if (erros[name]) {
      setErros((prevErros) => {
        const novosErros = { ...prevErros };
        delete novosErros[name];
        return novosErros;
      });
    }
  };

  const aoSalvar = async (evento) => {
    evento.preventDefault();

    const dadosParaValidar = {
      ...formData,
      preco: desformatarMoeda(formData.preco)
    };

    const validacao = validarProduto(dadosParaValidar);

    if (!validacao.valido) {
      setErros(validacao.erros);
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: 'Por favor, corrija os erros de validação antes de salvar a atualização.'
        });
      }
      return;
    }

    setCarregando(true);

    try {
      await produtoService.atualizar(formData.id, {
        codigo: formData.codigo,
        descricao: formData.descricao,
        preco: desformatarMoeda(formData.preco),
        quantidadeEstoque: Number(formData.quantidadeEstoque)
      });

      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'sucesso',
          mensagem: `Produto código "${formData.codigo}" atualizado com sucesso!`
        });
      }
    } catch (erro) {
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: erro.message || 'Erro ao atualizar os dados do produto.'
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
    <EditarProdutoView
      idBusca={idBusca}
      aoMudarIdBusca={aoMudarIdBusca}
      aoBuscarPorId={aoBuscarPorId}
      formData={formData}
      erros={erros}
      carregando={carregando}
      aoMudarCampo={aoMudarCampo}
      aoSalvar={aoSalvar}
      aoCancelar={aoCancelar}
      produtoCarregado={produtoCarregado}
    />
  );
}
