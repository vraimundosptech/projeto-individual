function carregarDados() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch(`/perfil/listar/${idUsuario}`, {
    method: "GET",
  })
    .then((res) => {
      res.json().then((json) => {
        plotarPerfil(json);
        console.log(json);
      });
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/kpis/listar/${idUsuario}`, {
    method: "GET",
  })
    .then((res) => {
      res.json().then((json) => {
        qtdBiblioteca.innerHTML = json[0].qtdJogos;
        qtdZerados.innerHTML = json[0].qtdZerados;
      });
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/favoritos/listar/${idUsuario}`, {
    method: "GET",
  })
    .then((res) => {
      res.json().then((json) => {
        plotarFavoritos(json);
      });
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/perfil/ultimasAvaliacoes/${idUsuario}`, {
    method: "GET",
  })
    .then((res) => {
      res.json().then((json) => {
        plotarUltimasAvaliacoes(json);
      });
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });
}

function plotarPerfil(dados) {
  switch (dados[0].mes) {
    case 1:
      dados[0].mes = "Jan";
      break;
    case 2:
      dados[0].mes = "Fev";
      break;
    case 3:
      dados[0].mes = "Mar";
      break;
    case 4:
      dados[0].mes = "Abr";
      break;
    case 5:
      dados[0].mes = "Mai";
      break;
    case 6:
      dados[0].mes = "Jun";
      break;
    case 7:
      dados[0].mes = "Jul";
      break;
    case 8:
      dados[0].mes = "Ago";
      break;
    case 9:
      dados[0].mes = "Set";
      break;
    case 10:
      dados[0].mes = "Out";
      break;
    case 11:
      dados[0].mes = "Nov";
      break;
    case 12:
      dados[0].mes = "Dez";
      break;
  }

  if (dados[0].foto != null) {
    foto_perfil.src = `../assets/uploads/foto_perfil/${dados[0].foto}`;
  }
  nomeUsuario_perfil.innerHTML = dados[0].nomeUsuario;
  info_perfil.innerHTML = `${dados[0].nome} • membro desde ${dados[0].mes} ${dados[0].ano}`;
  if (dados[0].descricao != null) {
    descricao_perfil.innerHTML = dados[0].descricao;
  } else {
    descricao_perfil.innerHTML = "Sem descrição...";
  }
}

function plotarFavoritos(dados) {
  for (let i = 0; i < dados.length; i++) {
    document.getElementById(`capa${i + 1}`).style.backgroundImage =
      `url('../assets/uploads/capas_jogo/${dados[i].capa}')`;

    document.getElementById(`texto_capa${i + 1}`).innerHTML = dados[i].nome;
  }
}

function plotarUltimasAvaliacoes(dados) {
  for (let i = 0; i < dados.length; i++) {
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

    ultimas_avaliacoes.innerHTML += `
    <div class="card">
      <img class="capa-jogo" src="../assets/uploads/capas_jogo/${dados[i].capa}">
      <div>
        <div class="titulo">
          <h1>${dados[i].nome}</h1>
          <div class="estrelas">${estrelas}</div>
        </div>
        <div class="titulo">
          <p>${dados[i].desenvolvedora} · ${dados[i].ano} · ${dados[i].categoria}</p>
          <p>${dados[i].diferencaData}</p>
        </div>
        <p>
          ${dados[i].comentario}
        </p>
      </div>
    </div>
    `;
  }
}
