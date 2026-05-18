ipt_capa.addEventListener("change", function () {
  texto_arquivo.textContent = this.files[0].name;
});

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
