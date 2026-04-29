function cadastrar() {
  let nomeCompleto = ipt_nome.value + " " + ipt_sobrenome.value;
  var nomeVar = nomeCompleto;
  var sobrenomeVar = ipt_sobrenome.value;
  var usuarioVar = ipt_usuario.value;
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;
  var confirmar_senhaVar = ipt_confirmar_senha.value;

  let possuiNum = false;
  let possuiEspecial = false;

  for (let i = 0; i < senhaVar.length; i++) {
    if (senhaVar[i] >= "0" && senhaVar[i] <= "9") {
      possuiNum = true;
    }
    if (senhaVar[i] >= "!" && senhaVar[i] <= "/") {
      possuiEspecial = true;
    }
  }

  if (
    nomeVar == `` ||
    sobrenomeVar == `` ||
    usuarioVar == `` ||
    emailVar == `` ||
    senhaVar == `` ||
    confirmar_senhaVar == ``
  ) {
    btnCadastrar.innerHTML = `<img src="./assets/loading-gif.gif">`;

    setTimeout(() => {
      backAlert.style.display = "flex";
      cardAlert.style.backgroundColor = "var(--error)";
      btnFechar.innerHTML = '<i class="bi bi-x"></i>';
      titleAlert.innerHTML = "Erro ao se cadastrar!";
      textAlert.innerHTML =
        "Ops! Parece que você esqueceu de preencher algum campo.";
      btnCadastrar.innerHTML = `Criar minha conta`;
    }, 1000);

    return false;
  } else if (!emailVar.includes("@") || !emailVar.includes(".")) {
    btnCadastrar.innerHTML = `<img src="./assets/loading-gif.gif">`;

    setTimeout(() => {
      backAlert.style.display = "flex";
      cardAlert.style.backgroundColor = "var(--error)";
      btnFechar.innerHTML = '<i class="bi bi-x"></i>';
      titleAlert.innerHTML = "Erro ao se cadastrar!";
      textAlert.innerHTML = `Parece que falta algo nesse e-mail. Não esqueça do '@' e do ponto (ex: nome@email.com)`;
      btnCadastrar.innerHTML = `Criar minha conta`;
    }, 1000);

    return false;
  } else if (senhaVar.length < 8) {
    btnCadastrar.innerHTML = `<img src="./assets/loading-gif.gif">`;

    setTimeout(() => {
      backAlert.style.display = "flex";
      cardAlert.style.backgroundColor = "var(--error)";
      btnFechar.innerHTML = '<i class="bi bi-x"></i>';
      titleAlert.innerHTML = "Erro ao se cadastrar!";
      textAlert.innerHTML = `Sua senha está muito curta! Ela deve ter pelo menos 8 caracteres.`;
      btnCadastrar.innerHTML = `Criar minha conta`;
    }, 1000);

    return false;
  } else if (!possuiNum) {
    btnCadastrar.innerHTML = `<img src="./assets/loading-gif.gif">`;

    setTimeout(() => {
      backAlert.style.display = "flex";
      cardAlert.style.backgroundColor = "var(--error)";
      btnFechar.innerHTML = '<i class="bi bi-x"></i>';
      titleAlert.innerHTML = "Erro ao se cadastrar!";
      textAlert.innerHTML = `Sua senha deve ter pelo menos um número!`;
      btnCadastrar.innerHTML = `Criar minha conta`;
    }, 1000);

    return false;
  } else if (!possuiEspecial) {
    btnCadastrar.innerHTML = `<img src="./assets/loading-gif.gif">`;

    setTimeout(() => {
      backAlert.style.display = "flex";
      cardAlert.style.backgroundColor = "var(--error)";
      btnFechar.innerHTML = '<i class="bi bi-x"></i>';
      titleAlert.innerHTML = "Erro ao se cadastrar!";
      textAlert.innerHTML = `Sua senha tem que ter pelo menos um caractere especial.`;
      btnCadastrar.innerHTML = `Criar minha conta`;
    }, 1000);

    return false;
  } else if (senhaVar != confirmar_senhaVar) {
    btnCadastrar.innerHTML = `<img src="./assets/loading-gif.gif">`;

    setTimeout(() => {
      backAlert.style.display = "flex";
      cardAlert.style.backgroundColor = "var(--error)";
      btnFechar.innerHTML = '<i class="bi bi-x"></i>';
      titleAlert.innerHTML = "Erro ao se cadastrar!";
      textAlert.innerHTML =
        "Quase lá! Certifique-se de que digitou a mesma senha nos dois campos.";
      btnCadastrar.innerHTML = `Criar minha conta`;
    }, 1000);

    return false;
  }

  fetch("usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      usuarioServer: usuarioVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        backAlert.style.display = "flex";
        cardAlert.style.backgroundColor = "var(--accent)";
        titleAlert.innerHTML = "Cadastro realizado com sucesso!";
        titleAlert.style.margin = "50px 0 20px 0";
        textAlert.innerHTML =
          '<button class="btn-continuar" id="btnContinuar" onclick="redirecionarLogin()">Continuar</button>';
        btnFechar.style.display = "none";
        btnCadastrar.innerHTML = `Criar minha conta`;
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      backAlert.style.display = "flex";
      cardAlert.style.backgroundColor = "var(--error)";
      btnFechar.style.display = "block";
      btnFechar.innerHTML = '<i class="bi bi-x"></i>';
      titleAlert.innerHTML = "Erro ao se cadastrar!";
      textAlert.innerHTML = `${resposta}`;
    });

  return false;
}

function validarSenha() {
  let senha = ipt_senha.value;
  let criterioSenha = 0;
  let possuiNum = false;
  let possuiEspecial = false;

  for (let i = 0; i < senha.length; i++) {
    if (senha[i] >= "0" && senha[i] <= "9") {
      possuiNum = true;
    }
    if (senha[i] >= "!" && senha[i] <= "/") {
      possuiEspecial = true;
    }
  }

  if (possuiNum) {
    criterioSenha++;
  }
  if (possuiEspecial) {
    criterioSenha++;
  }
  if (senha.length >= 8) {
    criterioSenha++;
  }
  if (senha != senha.toUpperCase() && senha.length > 0) {
    criterioSenha++;
  }

  if (criterioSenha == 4) {
    nivel_texto.innerHTML = `Forte`;
    senha_forte.style.backgroundColor = `var(--success)`;
    senha_media.style.backgroundColor = `var(--success)`;
    senha_fraca.style.backgroundColor = `var(--success)`;
    senha_insegura.style.backgroundColor = `var(--success)`;
    nivel_texto.style.color = `var(--success)`;
  } else if (criterioSenha == 3) {
    nivel_texto.innerHTML = `Média`;
    senha_forte.style.backgroundColor = `var(--bg-card)`;
    senha_media.style.backgroundColor = `var(--warning)`;
    senha_fraca.style.backgroundColor = `var(--warning)`;
    senha_insegura.style.backgroundColor = `var(--warning)`;
    nivel_texto.style.color = `var(--warning)`;
  } else if (criterioSenha == 2) {
    nivel_texto.innerHTML = `Fraca`;
    senha_forte.style.backgroundColor = `var(--bg-card)`;
    senha_media.style.backgroundColor = `var(--bg-card)`;
    senha_fraca.style.backgroundColor = `var(--error)`;
    senha_insegura.style.backgroundColor = `var(--error)`;
    nivel_texto.style.color = `var(--error)`;
  } else {
    nivel_texto.innerHTML = `Insegura`;
    senha_forte.style.backgroundColor = `var(--bg-card)`;
    senha_media.style.backgroundColor = `var(--bg-card)`;
    senha_fraca.style.backgroundColor = `var(--bg-card)`;
    senha_insegura.style.backgroundColor = `var(--error)`;
    nivel_texto.style.color = `var(--error)`;
  }
}
