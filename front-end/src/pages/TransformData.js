export const transformarDadosParaGoogleCharts = (dadosJogadores) => {
    let dadosFormatados = [["Jogadores", "Cruzamentos"]];
  
    dadosJogadores.forEach(jogador => {
      dadosFormatados.push([jogador.nome, jogador.cruzamentos]);
    });
  
    return dadosFormatados;
  };
  