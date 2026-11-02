import { useState, useEffect } from 'react';
import { formatarHora, formatarData } from '../../../utils/formatters';
import './Header.css';

export function Header() {
  const [horaAtual, setHoraAtual] = useState(() => formatarHora());
  const [dataAtual, setDataAtual] = useState(() => formatarData());

  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = new Date();
      setHoraAtual(formatarHora(agora));
      setDataAtual(formatarData(agora));
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <header id="cabecalhoPrincipal" name="cabecalhoPrincipal" className="cabecalho-container">
      <div
        id="relogioHora"
        name="relogioHora"
        data-testid="relogioHora"
        className="cabecalho-relogio-hora"
        title="Hora atual em tempo real"
      >
        <span className="cabecalho-rotulo">Hora:</span> {horaAtual}
      </div>

      <div className="cabecalho-titulo-app">
        <h1 className="cabecalho-titulo-texto" id="tituloSistema" name="tituloSistema">
          Gestão de Produtos
        </h1>
      </div>

      <div
        id="relogioData"
        name="relogioData"
        data-testid="relogioData"
        className="cabecalho-relogio-data"
        title="Data atual"
      >
        <span className="cabecalho-rotulo">Data:</span> {dataAtual}
      </div>
    </header>
  );
}

