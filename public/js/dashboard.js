function carregarDados() {
  var idUsuario = sessionStorage.getItem("ID_USUARIO");
  var nomeUsuario = sessionStorage.getItem("NOMEUSUARIO_USUARIO");

  nome_boas_vindas.innerText = nomeUsuario;

  fetch(`/kpis/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadoskpis) => {
      qtdBiblioteca.innerHTML = dadoskpis[0].qtdJogos;
      qtdZerados.innerHTML = dadoskpis[0].qtdZerados;
      qtdQuizzes.innerHTML = dadoskpis[0].qtdQuiz;
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/jogosMes/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadosjogosMes) => {
      plotarGraficoJogoMes(dadosjogosMes);
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/statusJogo/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadosStatus) => {
      plotarGraficoStatus(dadosStatus);
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/categoria/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadosCategoria) => {
      plotarGraficoCategoria(dadosCategoria);
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });

  fetch(`/top5/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((dadosTop5) => {
      plotarTop5(dadosTop5);
    })
    .catch((erro) => {
      console.log("Erro: ", erro);
    });
}

function plotarGraficoJogoMes(dados) {
  var jogosMesLabel = [];
  var mesAddData = [];
  var mesZeradoData = [];

  for (var i = 0; i < dados.length; i++) {
    jogosMesLabel.push(dados[i].mes);
    mesAddData.push(dados[i].qtdJogos);
    mesZeradoData.push(dados[i].qtdZerados);
  }

  for (var i = 0; i < jogosMesLabel.length; i++) {
    switch (jogosMesLabel[i]) {
      case 1:
        jogosMesLabel[i] = "Jan";
        break;
      case 2:
        jogosMesLabel[i] = "Fev";
        break;
      case 3:
        jogosMesLabel[i] = "Mar";
        break;
      case 4:
        jogosMesLabel[i] = "Abr";
        break;
      case 5:
        jogosMesLabel[i] = "Mai";
        break;
      case 6:
        jogosMesLabel[i] = "Jun";
        break;
      case 7:
        jogosMesLabel[i] = "Jul";
        break;
      case 8:
        jogosMesLabel[i] = "Ago";
        break;
      case 9:
        jogosMesLabel[i] = "Set";
        break;
      case 10:
        jogosMesLabel[i] = "Out";
        break;
      case 11:
        jogosMesLabel[i] = "Nov";
        break;
      case 12:
        jogosMesLabel[i] = "Dez";
        break;
    }
  }

  new Chart(jogosMes, {
    type: "line",
    data: {
      labels: jogosMesLabel,
      datasets: [
        {
          label: "Jogos adicionados",
          data: mesAddData,
          borderColor: "#7b2cbf",
          backgroundColor: "#5925835b",
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#7b2cbf",
        },
        {
          label: "Jogos zerados",
          data: mesZeradoData,
          borderColor: "#189fb9",
          backgroundColor: "#02899b75",
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#189fb9",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 20,
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            stepSize: 2,
            font: {
              size: 22,
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 22,
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            color: "#555",
            font: {
              size: 20,
            },
            useBorderRadius: true,
            borderRadius: 10,
            boxWidth: 20,
          },
        },
        tooltip: {
          backgroundColor: `#222`,
          titleColor: `#fff`,
          borderColor: `#444`,
          borderWidth: 1,

          padding: 10,
          cornerRadius: 8,

          titleFont: {
            size: 20,
            weight: "bold",
          },

          bodyFont: {
            size: 16,
          },
          callbacks: {
            title: function (context) {
              return `${context[0].label}`;
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
        },
      },
    },
  });
}

function plotarGraficoStatus(dados) {
  var statusLabel = [];
  var statusData = [];

  for (var i = 0; i < dados.length; i++) {
    statusLabel.push(dados[i].status);
    statusData.push(dados[i].qtdStatus);
  }

  new Chart(statusJogo, {
    type: "doughnut",
    data: {
      labels: statusLabel,
      datasets: [
        {
          data: statusData,
          backgroundColor: ["#7b2cbf", "#189fb9", "#ffc300", "#2e2e2e"],
          borderColor: "#222222",
          borderWidth: 5,
          hoverBorderColor: "#222222",
          hoverOffset: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 20,
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#555", // cor do texto da legenda
            font: {
              size: 20, // tamanho da fonte
            },
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: `#222`,
          titleColor: `#fff`,
          borderColor: `#444`,
          borderWidth: 1,

          padding: 10,
          cornerRadius: 8,

          titleFont: {
            size: 20,
            weight: "bold",
          },

          bodyFont: {
            size: 16,
          },
          callbacks: {
            title: function (context) {
              return `${context[0].label}`;
            },
          },
        },
      },
    },
  });
}

function plotarGraficoCategoria(dados) {
  var categoriaLabel = [];
  var categoriaData = [];

  for (var i = 0; i < dados.length; i++) {
    categoriaLabel.push(dados[i].categoria);
    categoriaData.push(dados[i].qtdJogo);
  }

  new Chart(bibliotecaCategoria, {
    type: "bar",
    data: {
      labels: categoriaLabel,
      datasets: [
        {
          data: categoriaData,
          backgroundColor: ["#7b2cbf", "#189fb9", "#ffc300", "#ffffff"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 50,
      },
      scales: {
        y: {
          ticks: {
            stepSize: 2,
            font: {
              size: 22,
            },
          },
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 22,
            },
            minRotation: 90,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: `#222`,
          titleColor: `#fff`,
          borderColor: `#444`,
          borderWidth: 1,

          padding: 10,
          cornerRadius: 8,

          titleFont: {
            size: 20,
            weight: "bold",
          },

          bodyFont: {
            size: 16,
          },
          callbacks: {
            title: function (context) {
              return `${context[0].label}`;
            },
          },
        },
      },
    },
  });
}

function plotarTop5(dados) {
  for (let i = 0; i < dados.length; i++) {
    top5_dash.innerHTML += `
    <div class="top5-card">
        <h1>${i + 1}</h1>
        <h2>${dados[i].nome}</h2>
        <h3>${dados[i].nota}</h3>
        <div>
          <i class="bi bi-star-fill"></i>
        </div>
      </div>
    `;
  }
}
