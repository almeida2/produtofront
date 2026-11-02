/**
 * Utilitários de formatação para a aplicação de Produtos.
 */

/**
 * Formata um valor numérico para o padrão de moeda Real Brasileiro (R$ X,XX)
 * @param {number|string} valor 
 * @returns {string}
 */
export function formatarMoeda(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return '';
  }

  const numero = typeof valor === 'number' ? valor : desformatarMoeda(valor);

  if (isNaN(numero)) {
    return '';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numero);
}

/**
 * Converte uma string formatada em moeda (ex: "R$ 1.250,50" ou "1250,50" ou "1250.50") para número float.
 * @param {string|number} valorFormatado 
 * @returns {number}
 */
export function desformatarMoeda(valorFormatado) {
  if (typeof valorFormatado === 'number') {
    return valorFormatado;
  }

  if (!valorFormatado || typeof valorFormatado !== 'string') {
    return 0;
  }

  // Remove caracteres que não sejam dígitos, vírgula ou ponto ou sinal de menos
  let limpo = valorFormatado.replace(/[^\d.,-]/g, '').trim();

  if (!limpo) {
    return 0;
  }

  // Se tiver vírgula e ponto, assumir formato pt-BR (ponto milhar, vírgula decimal)
  if (limpo.includes('.') && limpo.includes(',')) {
    limpo = limpo.replace(/\./g, '').replace(',', '.');
  } else if (limpo.includes(',')) {
    // Se só tiver vírgula, é o separador decimal brasileiro
    limpo = limpo.replace(',', '.');
  }

  const resultado = parseFloat(limpo);
  return isNaN(resultado) ? 0 : resultado;
}

/**
 * Máscara em tempo real para digitação de moeda no input.
 * Permite digitação contínua de centavos ou valor formatado.
 * @param {string} valor 
 * @returns {string}
 */
export function mascararMoedaInput(valor) {
  if (!valor) return '';

  // Se o valor já tiver dígitos
  const apenasDigitos = String(valor).replace(/\D/g, '');
  if (!apenasDigitos) return '';

  const centavos = parseInt(apenasDigitos, 10) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(centavos);
}

/**
 * Formata a data atual no formato DD/MM/AAAA
 * @param {Date} [data=new Date()]
 * @returns {string}
 */
export function formatarData(data = new Date()) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/**
 * Formata a hora atual no formato HH:mm:ss
 * @param {Date} [data=new Date()]
 * @returns {string}
 */
export function formatarHora(data = new Date()) {
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const segundos = String(data.getSeconds()).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
}

