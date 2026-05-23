let dadosGlobaisBiblioteca;

function carregarDados(instrucao) {
  var idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch(`/kpis/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadoskpis) => {
      qtdJogos.innerHTML = dadoskpis[0].qtdJogos;
      qtdStatus.innerHTML = dadoskpis[0].qtdJogos;
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/statusJogo/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadosStatus) => {
      qtdJogando.innerHTML = dadosStatus[0].qtdStatus;
      qtdZerados.innerHTML = dadosStatus[1].qtdStatus;
      qtdQuero.innerHTML = dadosStatus[2].qtdStatus;
      qtdPausados.innerHTML = dadosStatus[3].qtdStatus;
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/biblioteca/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadosBiblioteca) => {
      plotarBiblioteca(dadosBiblioteca, instrucao);
      dadosGlobaisBiblioteca = dadosBiblioteca;
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });
}

function plotarBiblioteca(dados, instrucao) {
  let estrelas = ``;
  let mensagem = ``;

  if (
    instrucao != "Zerado" &&
    instrucao != "Jogando" &&
    instrucao != "Quero jogar" &&
    instrucao != "Pausado"
  ) {
    instrucao = "";
  }

  for (let i = 0; i < dados.length; i++) {
    if (dados[i].statusJogo.includes(instrucao)) {
      switch (Number(dados[i].nota)) {
        case 1:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 1.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 2:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 2.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 3:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 3.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 4:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 1:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 4.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>`;
          break;
        case 5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        `;
          break;
        default:
          estrelas = `Sem avaliação`;
      }

      let capaStatus = "";
      switch (dados[i].statusJogo) {
        case "Jogando":
          capaStatus = "jogando";
          break;
        case "Zerado":
          capaStatus = "zerado";
          break;
        case "Quero jogar":
          capaStatus = "quero";
          break;
        case "Pausado":
          capaStatus = "pausado";
          break;
      }

      mensagem += `
        <div class="card" onclick="mandarId(${dados[i].idJogo})">
        <img class="capa" src="../assets/uploads/capas_jogo/${dados[i].capa}"></img>
        <div class="status-capa ${capaStatus}">${dados[i].statusJogo}</div>
          <div>
            <h1>${dados[i].jogo}</h1>
            <div class="estrelas">${estrelas}</div>
            </div>
        </div>
        `;
    }
  }
  bibliotecaCapas.innerHTML = mensagem;
}

function plotarTodos() {
  statusTodos.classList.add("ativo");
  statusJogando.classList.remove("ativo");
  statusZerados.classList.remove("ativo");
  statusQuero.classList.remove("ativo");
  statusPausados.classList.remove("ativo");

  let instrucao = "";
  carregarDados(instrucao);
}

function plotarJogando() {
  statusTodos.classList.remove("ativo");
  statusJogando.classList.add("ativo");
  statusZerados.classList.remove("ativo");
  statusQuero.classList.remove("ativo");
  statusPausados.classList.remove("ativo");

  instrucao = `Jogando`;
  carregarDados(instrucao);
}

function plotarZerados() {
  statusTodos.classList.remove("ativo");
  statusJogando.classList.remove("ativo");
  statusZerados.classList.add("ativo");
  statusQuero.classList.remove("ativo");
  statusPausados.classList.remove("ativo");

  instrucao = `Zerado`;
  carregarDados(instrucao);
}

function plotarQuero() {
  statusTodos.classList.remove("ativo");
  statusJogando.classList.remove("ativo");
  statusZerados.classList.remove("ativo");
  statusQuero.classList.add("ativo");
  statusPausados.classList.remove("ativo");

  instrucao = `Quero jogar`;
  carregarDados(instrucao);
}

function plotarPausados() {
  statusTodos.classList.remove("ativo");
  statusJogando.classList.remove("ativo");
  statusZerados.classList.remove("ativo");
  statusQuero.classList.remove("ativo");
  statusPausados.classList.add("ativo");

  instrucao = `Pausado`;
  carregarDados(instrucao);
}

function buscarJogo() {
  let jogoPesquisado = ipt_buscar_jogo.value;
  let mensagem = ``;
  let estrelas = ``;

  if (jogoPesquisado.length > 0) {
    statusTodos.classList.add("ativo");
    statusJogando.classList.remove("ativo");
    statusZerados.classList.remove("ativo");
    statusQuero.classList.remove("ativo");
    statusPausados.classList.remove("ativo");
  }

  for (let i = 0; i < dadosGlobaisBiblioteca.length; i++) {
    if (
      dadosGlobaisBiblioteca[i].jogo
        .toLowerCase()
        .includes(jogoPesquisado.toLowerCase())
    ) {
      switch (Number(dadosGlobaisBiblioteca[i].nota)) {
        case 1:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 1.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 2:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 2.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 3:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 3.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 4:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 1:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <i class="bi bi-star"></i>`;
          break;
        case 4.5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>`;
          break;
        case 5:
          estrelas = `<i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        `;
          break;
        default:
          estrelas = `Sem avaliação`;
      }

      mensagem += `
        <div class="card">
          <img class="capa" src="../assets/uploads/capas_jogo/${dadosGlobaisBiblioteca[i].capa}"></img>
          <div>
            <h1>${dadosGlobaisBiblioteca[i].jogo}</h1>
            <div class="estrelas">${estrelas}</div>
            </div>
        </div>
        `;
    }

    bibliotecaCapas.innerHTML = mensagem;
  }
}

function adicionarJogoBiblioteca(idJogo) {
  var idUsuarioVar = sessionStorage.getItem("ID_USUARIO");
  var idJogoVar = idJogo;

  fetch(`/biblioteca/cadastrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuarioVar: idUsuarioVar,
      idJogoVar: idJogoVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);
      modal.style.display = "none";
      plotarTodos();

      if (resposta.ok) {
        console.log("resposta: ", resposta);
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function mandarId(idJogo) {
  sessionStorage.setItem("ID_JOGO", idJogo);
  window.location.href = "jogo.html";
}
