document.addEventListener('DOMContentLoaded', function () {
    // Botão de ONGs Parceiras - Exibir e ocultar conteúdo
    document.getElementById('btnOngs').addEventListener('click', function () {
        const contentOngs = document.getElementById('contentOngs');
        const isHidden = contentOngs.style.display === 'none'; // Verifica se o conteúdo está escondido
        contentOngs.style.display = isHidden ? 'block' : 'none'; // Alterna entre mostrar e esconder
        this.innerText = isHidden ? 'Esconder ONGs Parceiras' : 'Veja Nossas ONGs Parceiras'; // Atualiza o texto do botão
    });

    // Botão de Recomendações - Exibir e ocultar conteúdo
    document.getElementById('btnRecomendacoes').addEventListener('click', function () {
        const contentRecomendacoes = document.getElementById('contentRecomendacoes');
        const isHidden = contentRecomendacoes.style.display === 'none'; // Verifica se o conteúdo está escondido
        contentRecomendacoes.style.display = isHidden ? 'block' : 'none'; // Alterna entre mostrar e esconder
        this.innerText = isHidden ? 'Esconder Recomendações' : 'Veja Recomendações'; // Atualiza o texto do botão
    });

    // Botão "Leia Mais" das ONGs Parceiras
    const ongsLeiaMaisButtons = document.querySelectorAll('.card button[data-bs-toggle="collapse"]');
    ongsLeiaMaisButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = document.querySelector(this.getAttribute('data-bs-target'));  // Obtém o conteúdo da ONG
            const isHidden = target.style.display === 'none'; // Verifica se o conteúdo está escondido

            // Alterna entre mostrar e esconder
            if (isHidden) {
                target.style.display = 'block'; // Exibe o conteúdo
                this.innerText = 'Esconder'; // Atualiza o texto do botão para 'Esconder'
            } else {
                target.style.display = 'none'; // Oculta o conteúdo
                this.innerText = 'Leia Mais'; // Atualiza o texto do botão para 'Leia Mais'
            }
        });
    });

    // Botão "Leia Mais" nas Recomendações
    const recomendacoesLeiaMaisButtons = document.querySelectorAll('.accordion button[data-bs-toggle="collapse"]');
    recomendacoesLeiaMaisButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = document.querySelector(this.getAttribute('data-bs-target'));  // Obtém o conteúdo da recomendação
            const isHidden = target.style.display === 'none'; // Verifica se o conteúdo está escondido

            // Alterna entre mostrar e esconder
            if (isHidden) {
                target.style.display = 'block'; // Exibe o conteúdo
            } else {
                target.style.display = 'none'; // Oculta o conteúdo
            }
        });
    });
});


