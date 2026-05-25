function carregarDados() {
  let idUsuario = sessionStorage.getItem("ID_USUARIO");

  fetch(`/perfil/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dados) => {
      plotarPerfil(dados);
      console.log(dados);
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/kpis/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadoskpis) => {
      qtdBiblioteca.innerHTML = dadoskpis[0].qtdJogos;
      qtdZerados.innerHTML = dadoskpis[0].qtdZerados;
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/favoritos/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dados) => {
      plotarFavoritos(dados)
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
  info_perfil.innerHTML = `@${dados[0].nome} • membro desde ${dados[0].mes} ${dados[0].ano}`;
  if (dados[0].foto != null) {
    descricao_perfil.innerHTML = dados[0].descricao;
  } else {
    descricao_perfil.innerHTML = 'Sem descrição...'
  }
}

function plotarFavoritos(dados) {
  for(let i = 0; i < dados.length; i++) {
    document.getElementById(`capa${i + 1}`).style.backgroundImage = `url('../assets/uploads/capas_jogo/${dados[i].capa}')`
    
    document.getElementById(`texto_capa${i + 1}`).innerHTML = dados[i].nome
  }
}