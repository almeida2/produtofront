import { useState } from 'react';
import { CadastrarProdutosView } from './CadastrarProdutosView';
import { produtoService } from '../../../api/produtoService';
import { validarProduto } from '../../../utils/validators';
import { desformatarMoeda, mascararMoedaInput } from '../../../utils/formatters';

const ESTADO_INICIAL = {
  codigo: '',
  descricao: '',
  preco: '',
  quantidadeEstoque: ''
};

/**
 * Componente Container para Cadastrar Produtos.
 * Responsável exclusivamente pela lógica de negócio, estado, consumo da API e validações.
 */
export function CadastrarProdutosContainer({ aoNotificarFeedback, aoSucessoCadastro }) {
  const [formData, setFormData] = useState(ESTADO_INICIAL);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);

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

    // Limpa erro do campo alterado
    if (erros[name]) {
      setErros((prevErros) => {
        const novosErros = { ...prevErros };
        delete novosErros[name];
        return novosErros;
      });
    }
  };

  const aoLimpar = () => {
    setFormData(ESTADO_INICIAL);
    setErros({});
  };

  const aoEnviar = async (evento) => {
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
          mensagem: 'Por favor, preencha os campos obrigatórios corretamente antes de salvar.'
        });
      }
      return;
    }

    setCarregando(true);
    setErros({});

    try {
      const novoProduto = await produtoService.cadastrar({
        codigo: formData.codigo,
        descricao: formData.descricao,
        preco: desformatarMoeda(formData.preco),
        quantidadeEstoque: Number(formData.quantidadeEstoque)
      });

      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'sucesso',
          mensagem: `Cadastro realizado com sucesso! Produto código ${formData.codigo} registrado.`
        });
      }

      aoLimpar();

      if (aoSucessoCadastro) {
        aoSucessoCadastro(novoProduto);
      }
    } catch (erro) {
      if (aoNotificarFeedback) {
        aoNotificarFeedback({
          tipo: 'erro',
          mensagem: erro.message || 'Erro ao realizar o cadastro do produto.'
        });
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <CadastrarProdutosView
      formData={formData}
      erros={erros}
      carregando={carregando}
      aoMudarCampo={aoMudarCampo}
      aoEnviar={aoEnviar}
      aoLimpar={aoLimpar}
    />
  );
}

