function carregarDados() {
  fetch(`/ranking/listar`, {
    method: "GET",
  })
    .then((res) => {
      res.json().then((json) => {
        plotarRanking(json);
        console.log(json);
      });
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  return false;
}

function plotarRanking(dados) {
  top1_capa.style.backgroundImage = `url('../assets/uploads/capas_jogo/${dados[0].capa}')`;
  top1_categoria.innerHTML = dados[0].categoria;
  top1_nome.innerHTML = dados[0].nome;
  top1_desenvolvedora.innerHTML = dados[0].desenvolvedora;
  top1_lancamento.innerHTML = dados[0].anoLancamento;
  top1_nota.innerHTML = dados[0].nota;

  top2_capa.style.backgroundImage = `url('../assets/uploads/capas_jogo/${dados[1].capa}')`;
  top2_categoria.innerHTML = dados[1].categoria;
  top2_nome.innerHTML = dados[1].nome;
  top2_desenvolvedora.innerHTML = dados[1].desenvolvedora;
  top2_lancamento.innerHTML = dados[1].anoLancamento;
  top2_nota.innerHTML = dados[1].nota;

  top3_capa.style.backgroundImage = `url('../assets/uploads/capas_jogo/${dados[2].capa}')`;
  top3_categoria.innerHTML = dados[2].categoria;
  top3_nome.innerHTML = dados[2].nome;
  top3_desenvolvedora.innerHTML = dados[2].desenvolvedora;
  top3_lancamento.innerHTML = dados[2].anoLancamento;
  top3_nota.innerHTML = dados[2].nota;

  for (let i = 3; i < dados.length; i++) {
    ranking.innerHTML += `
      <div class="card">
          <div class="posicao">${i + 1}º</div>
          <img
            src="../assets/uploads/capas_jogo/${dados[i].capa}"
            alt=""
            class="capa"
          />
          <div class="info-jogo">
            <h1>${dados[i].nome}</h1>
            <div>
              <h2>${dados[i].desenvolvedora}</h2>
              <h2>${dados[i].anoLancamento}</h2>
            </div>
          </div>
          <div class="categoria">
            <h2>${dados[i].categoria}</h2>
          </div>
          <div class="nota">
            <h1>${dados[i].nota}</h1>
            <i class="bi bi-star-fill"></i>
          </div>
        </div>
      `;
  }
}
