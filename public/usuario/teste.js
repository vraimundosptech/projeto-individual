if (dados[i].tempo.length > 1) {
  div.innerHTML = `${dados[i].tempo}h atrás`;
} else {
  div.innerHTML = `${dados[i].tempo} dia(s)`;
}

for (let i = 0; i < dados.length; i++) {
  if (i == 25) {
    break;
  }
  div_resultado.innerHTML += `
    <div class="card">
        <img class="capa-modal" src=""></img>
        <div>
            <h1>Nome do Jogo</h1>
            <h2>Categoria</h2>
            <h2>Desenvolvedora</h2>
            <h2>Data de lancamento</h2>
            <div class="direita">Classificao de Idade</div>
        </div>
    </div>
`;
}
