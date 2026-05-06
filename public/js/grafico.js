const jogoMes = document.getElementById("jogosMes");
const statusJogo = document.getElementById("statusJogo");
const bibliotecaCategoria = document.getElementById("bibliotecaCategoria");
const top5Jogos = document.getElementById("top5Jogos");

new Chart(jogoMes, {
  type: "line",
  data: {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Jogos adicionados",
        data: [4, 7, 5, 9, 6, 8],
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
        data: [2, 3, 4, 5, 3, 6],
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


