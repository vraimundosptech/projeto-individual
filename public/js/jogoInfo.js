let notaAvaliacao = 0
let statusJogo = ''

function estrelas(nota) {
    if (nota == 1) {
        n1.classList.replace('bi-star', 'bi-star-fill')
        n1.style.color = 'var(--warning)'

        n2.classList.replace('bi-star-fill', 'bi-star')
        n2.style.color = 'var(--text-muted)'

        n3.classList.replace('bi-star-fill', 'bi-star')
        n3.style.color = 'var(--text-muted)'

        n4.classList.replace('bi-star-fill', 'bi-star')
        n4.style.color = 'var(--text-muted)'

        n5.classList.replace('bi-star-fill', 'bi-star')
        n5.style.color = 'var(--text-muted)'
    } else if (nota == 2) {
        n1.classList.replace('bi-star', 'bi-star-fill')
        n1.style.color = 'var(--warning)'

        n2.classList.replace('bi-star', 'bi-star-fill')
        n2.style.color = 'var(--warning)'

        n3.classList.replace('bi-star-fill', 'bi-star')
        n3.style.color = 'var(--text-muted)'

        n4.classList.replace('bi-star-fill', 'bi-star')
        n4.style.color = 'var(--text-muted)'

        n5.classList.replace('bi-star-fill', 'bi-star')
        n5.style.color = 'var(--text-muted)'
    } else if (nota == 3) {
        n1.classList.replace('bi-star', 'bi-star-fill')
        n1.style.color = 'var(--warning)'

        n2.classList.replace('bi-star', 'bi-star-fill')
        n2.style.color = 'var(--warning)'

        n3.classList.replace('bi-star', 'bi-star-fill')
        n3.style.color = 'var(--warning)'

        n4.classList.replace('bi-star-fill', 'bi-star')
        n4.style.color = 'var(--text-muted)'

        n5.classList.replace('bi-star-fill', 'bi-star')
        n5.style.color = 'var(--text-muted)'
    } else if (nota == 4) {
        n1.classList.replace('bi-star', 'bi-star-fill')
        n1.style.color = 'var(--warning)'

        n2.classList.replace('bi-star', 'bi-star-fill')
        n2.style.color = 'var(--warning)'

        n3.classList.replace('bi-star', 'bi-star-fill')
        n3.style.color = 'var(--warning)'

        n4.classList.replace('bi-star', 'bi-star-fill')
        n4.style.color = 'var(--warning)'

        n5.classList.replace('bi-star-fill', 'bi-star')
        n5.style.color = 'var(--text-muted)'
    } else {
        n1.classList.replace('bi-star', 'bi-star-fill')
        n1.style.color = 'var(--warning)'

        n2.classList.replace('bi-star', 'bi-star-fill')
        n2.style.color = 'var(--warning)'

        n3.classList.replace('bi-star', 'bi-star-fill')
        n3.style.color = 'var(--warning)'

        n4.classList.replace('bi-star', 'bi-star-fill')
        n4.style.color = 'var(--warning)'

        n5.classList.replace('bi-star', 'bi-star-fill')
        n5.style.color = 'var(--warning)'
    }

    notaAvaliacao = nota
}

function tamanhoTexto() {
    var descricao = text_descricao.value

    tamanho_texto.innerText = descricao.length
}

function mudarStatus(classe) {
    if (classe == 'Jogando') {
        jogando.classList.add('jogando')
        zerado.classList.remove('zerado')
        quero_jogar.classList.remove('quero-jogar')
        pausado.classList.remove('pausado')
    } else if (classe == 'Zerado') {
        jogando.classList.remove('jogando')
        zerado.classList.add('zerado')
        quero_jogar.classList.remove('quero-jogar')
        pausado.classList.remove('pausado')
    } else if (classe == 'Quero jogar') {
        jogando.classList.remove('jogando')
        zerado.classList.remove('zerado')
        quero_jogar.classList.add('quero-jogar')
        pausado.classList.remove('pausado')
    } else {
        jogando.classList.remove('jogando')
        zerado.classList.remove('zerado')
        quero_jogar.classList.remove('quero-jogar')
        pausado.classList.add('pausado')
    }
    statusJogo = classe
}

function mudarFavorito() {
    if(favorito.classList.contains('favoritado')) {
        
    } else {

    }
}