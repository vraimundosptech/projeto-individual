let notaAvaliacao = 0;
const idJogo = sessionStorage.getItem("ID_JOGO");
const idUsuario = sessionStorage.getItem("ID_USUARIO");

function carregarDados() {
  fetch(`/jogo/listarUm/${idJogo}/${idUsuario}`)
    .then((res) => res.json())
    .then((dadosJogo) => {
      plotarJogo(dadosJogo);
      console.log(dadosJogo);
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });
}

function plotarJogo(dados) {
  document.title = dados[0].nome
  img_capa.src = `../assets/uploads/capas_jogo/${dados[0].capa}`;

  switch (dados[0].statusJogo) {
    case "Jogando":
      jogando.classList.add("jogando");
      break;
    case "Zerado":
      zerado.classList.add("zerado");
      break;
    case "Quero jogar":
      quero_jogar.classList.add("quero-jogar");
      break;
    case "Pausado":
      pausado.classList.add("pausado");
      break;
    default:
      jogando.classList.remove("jogando");
      zerado.classList.remove("zerado");
      quero_jogar.classList.remove("quero-jogar");
      pausado.classList.remove("pausado");
  }

  if (dados[0].favorito == true) {
    favorito.classList.replace("adicionar-favoritos", "favorito");
    texto_favorito.innerText = "Nos favoritos";
  } else {
    favorito.classList.replace("favorito", "adicionar-favoritos");
    texto_favorito.innerText = "Adicionar aos favoritos";
  }

  nmr_nota.innerText = dados[0].notaComunidade;
  qtd_avaliacoes.innerText = dados[0].qtdAvaliacao;

  nome_jogo.innerText = dados[0].nome;
  categoria_jogo.innerText = dados[0].categoria;
  desenvolvedora_jogo.innerText = dados[0].desenvolvedora;
  dt_lancamento_jogo.innerText = dados[0].dtLancamento;
  descricao_jogo.innerText = dados[0].descricao;
  estrelas(dados[0].nota)
  text_comentario.value = dados[0].comentario;
}

function estrelas(nota) {
  if (nota == 1) {
    n1.classList.replace("bi-star", "bi-star-fill");
    n1.style.color = "var(--warning)";

    n2.classList.replace("bi-star-fill", "bi-star");
    n2.style.color = "var(--text-muted)";

    n3.classList.replace("bi-star-fill", "bi-star");
    n3.style.color = "var(--text-muted)";

    n4.classList.replace("bi-star-fill", "bi-star");
    n4.style.color = "var(--text-muted)";

    n5.classList.replace("bi-star-fill", "bi-star");
    n5.style.color = "var(--text-muted)";
  } else if (nota == 2) {
    n1.classList.replace("bi-star", "bi-star-fill");
    n1.style.color = "var(--warning)";

    n2.classList.replace("bi-star", "bi-star-fill");
    n2.style.color = "var(--warning)";

    n3.classList.replace("bi-star-fill", "bi-star");
    n3.style.color = "var(--text-muted)";

    n4.classList.replace("bi-star-fill", "bi-star");
    n4.style.color = "var(--text-muted)";

    n5.classList.replace("bi-star-fill", "bi-star");
    n5.style.color = "var(--text-muted)";
  } else if (nota == 3) {
    n1.classList.replace("bi-star", "bi-star-fill");
    n1.style.color = "var(--warning)";

    n2.classList.replace("bi-star", "bi-star-fill");
    n2.style.color = "var(--warning)";

    n3.classList.replace("bi-star", "bi-star-fill");
    n3.style.color = "var(--warning)";

    n4.classList.replace("bi-star-fill", "bi-star");
    n4.style.color = "var(--text-muted)";

    n5.classList.replace("bi-star-fill", "bi-star");
    n5.style.color = "var(--text-muted)";
  } else if (nota == 4) {
    n1.classList.replace("bi-star", "bi-star-fill");
    n1.style.color = "var(--warning)";

    n2.classList.replace("bi-star", "bi-star-fill");
    n2.style.color = "var(--warning)";

    n3.classList.replace("bi-star", "bi-star-fill");
    n3.style.color = "var(--warning)";

    n4.classList.replace("bi-star", "bi-star-fill");
    n4.style.color = "var(--warning)";

    n5.classList.replace("bi-star-fill", "bi-star");
    n5.style.color = "var(--text-muted)";
  } else if(nota == 5) {
    n1.classList.replace("bi-star", "bi-star-fill");
    n1.style.color = "var(--warning)";

    n2.classList.replace("bi-star", "bi-star-fill");
    n2.style.color = "var(--warning)";

    n3.classList.replace("bi-star", "bi-star-fill");
    n3.style.color = "var(--warning)";

    n4.classList.replace("bi-star", "bi-star-fill");
    n4.style.color = "var(--warning)";

    n5.classList.replace("bi-star", "bi-star-fill");
    n5.style.color = "var(--warning)";
  } else {
    n1.classList.replace("bi-star", "bi-star");
    n1.style.color = "var(--text-muted)";

    n2.classList.replace("bi-star", "bi-star");
    n2.style.color = "var(--text-muted)";

    n3.classList.replace("bi-star", "bi-star");
    n3.style.color = "var(--text-muted)";

    n4.classList.replace("bi-star", "bi-star");
    n4.style.color = "var(--text-muted)";

    n5.classList.replace("bi-star", "bi-star");
    n5.style.color = "var(--text-muted)";
  }

  notaAvaliacao = nota;
}

function tamanhoTexto() {
  var comentario = text_comentario.value;

  tamanho_texto.innerText = comentario.length;
}

function mudarStatus(classe) {
  fetch(`/jogo/categorizar/${idJogo}/${idUsuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      statusJogo: classe,
    }),
  });

  if (classe == "Jogando") {
    jogando.classList.add("jogando");
    zerado.classList.remove("zerado");
    quero_jogar.classList.remove("quero-jogar");
    pausado.classList.remove("pausado");
  } else if (classe == "Zerado") {
    jogando.classList.remove("jogando");
    zerado.classList.add("zerado");
    quero_jogar.classList.remove("quero-jogar");
    pausado.classList.remove("pausado");
  } else if (classe == "Quero jogar") {
    jogando.classList.remove("jogando");
    zerado.classList.remove("zerado");
    quero_jogar.classList.add("quero-jogar");
    pausado.classList.remove("pausado");
  } else {
    jogando.classList.remove("jogando");
    zerado.classList.remove("zerado");
    quero_jogar.classList.remove("quero-jogar");
    pausado.classList.add("pausado");
  }
  statusJogo = classe;
}

function mudarFavorito() {
  if (favorito.classList.contains("favorito")) {
    favoritoJogo = false;
    favorito.classList.replace("favorito", "adicionar-favoritos");
    texto_favorito.innerText = "Adicionar aos favoritos";
  } else {
    favoritoJogo = true;
    favorito.classList.replace("adicionar-favoritos", "favorito");
    texto_favorito.innerText = "Nos favoritos";
  }

  fetch(`/jogo/favoritar/${idJogo}/${idUsuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorito: favoritoJogo,
    }),
  });
}

function salvarAvaliacao() {
  fetch(`/jogo/avaliar/${idJogo}/${idUsuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nota: notaAvaliacao,
      comentario: text_comentario.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        window.alert(
          "Avaliação atualizada com sucesso pelo usuario de email: " +
            sessionStorage.getItem("EMAIL_USUARIO") +
            "!",
        );
        window.location = "/usuario/biblioteca.html";
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar sua avaliação! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
