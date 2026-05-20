function carregarDados() {
  fetch(`/ranking/listar/`)
    .then((res) => res.json())
    .then((dadosRanking) => {
      plotarRanking(dadosRanking);
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  return false;
}

function plotarRanking(dadosRanking) {
    
}