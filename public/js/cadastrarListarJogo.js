ipt_capa.addEventListener("change", function () {
  texto_arquivo.textContent = this.files[0].name;
});

let dadosGlobaisJogos;

function abrirModal() {
  modal.style.display = "flex";
  div_pesquisar.style.display = "flex";
  body.style.overflow = "hidden";

  fetch(`/jogo/listarTodos`)
    .then((res) => res.json())
    .then((dadosJogos) => {
      dadosGlobaisJogos = dadosJogos;
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });
}

function fecharModal() {
  modal.style.display = "none";
  jogo_nao_encontrado.style.display = "none";
  criar_jogo.style.display = "none";
  body.style.overflow = "auto";
}

function cadastrarJogo() {
  var capa = ipt_capa.files[0];
  var nome = ipt_nome.value;
  var desenvolvedora = ipt_desenvolvedora.value;
  var dtLancamento = ipt_lancamento.value;
  var categoria = slct_categoria.value;
  var classificacaoIdade = slct_idade.value;
  var descricao = textarea_descricao.value;

  if (
    !capa ||
    !nome ||
    !desenvolvedora ||
    !dtLancamento ||
    !categoria ||
    !classificacaoIdade ||
    !descricao
  ) {
    alert(`Preencha todos os campos!`);
  }

  var formData = new FormData();

  formData.append("capa", capa);
  formData.append("nome", nome);
  formData.append("desenvolvedora", desenvolvedora);
  formData.append("dtLancamento", dtLancamento);
  formData.append("categoria", categoria);
  formData.append("classificacaoIdade", classificacaoIdade);
  formData.append("descricao", descricao);

  fetch("/jogo/cadastrar", {
    method: "POST",
    body: formData,
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        alert("Cadastro do jogo realizado com sucesso");
      } else {
        throw "Erro ao cadastrar jogo";
      }
    })
    .catch(function (erro) {
      console.log(`#ERRO: ${erro}`);
    });

  return false;
}

let timeoutPesquisa;

function pesquisarJogoComDelay() {
  let jogoPesquisado = ipt_pesquisar_jogo.value;

  if (jogoPesquisado.length > 2) {
    clearTimeout(timeoutPesquisa);
    carregando.style.display = "flex";
    div_resultado_pesquisa.innerHTML = "";
    jogo_nao_encontrado.style.display = "none";
    timeoutPesquisa = setTimeout(() => {
      pesquisarJogo();
    }, 400);
  } else if (jogoPesquisado.length <= 2) {
    div_resultado_pesquisa.innerHTML = "";
  }
}

function pesquisarJogo() {
  carregando.style.display = "none";
  let jogoPesquisado = ipt_pesquisar_jogo.value;
  let mensagem = ``;

  for (let i = 0; i < dadosGlobaisJogos.length; i++) {
    if (
      dadosGlobaisJogos[i].jogo
        .toLowerCase()
        .includes(jogoPesquisado.toLowerCase())
    ) {
      mensagem += `
        <div class="card" id="div_card" onclick="popUpAdicionar(${dadosGlobaisJogos[i].idJogo})">
        <img class="capa-modal"
        src="../assets/uploads/capas_jogo/${dadosGlobaisJogos[i].capa}"></img>
        <div class="info-jogo">
        <h1>${dadosGlobaisJogos[i].jogo}</h1>
        <h2>${dadosGlobaisJogos[i].categoria}</h2>
        <h2>${dadosGlobaisJogos[i].desenvolvedora}</h2>
        <div class="bottom-card">
        <h2>${dadosGlobaisJogos[i].dtLancamento}</h2>
        <img class="classificacao-idade" src="../assets/imgs/classificacaoIdade/${dadosGlobaisJogos[i].classificacaoIdade}.png"></img>
        </div>
        </div>
        </div>
        `;
    }
  }

  div_resultado_pesquisa.innerHTML = mensagem;
  if (div_resultado_pesquisa.innerHTML == "") {
    jogo_nao_encontrado.style.display = "flex";
  }
}

function abrirCriarJogo() {
  jogo_nao_encontrado.style.display = "none";
  div_pesquisar.style.display = "none";
  criar_jogo.style.display = "flex";
  ipt_pesquisar_jogo.value = "";
}

function fecharCriarJogo() {
  criar_jogo.style.display = "none";
  div_pesquisar.style.display = "flex";
}

function popUpAdicionar(idJogo) {
  popUpAdicionarCard.style.display = "block";
  sim.setAttribute("onclick", `adicionarJogoBiblioteca(${idJogo})`);
}

function fecharPopUpAdicionar() {
  popUpAdicionarCard.style.display = "none";
}
