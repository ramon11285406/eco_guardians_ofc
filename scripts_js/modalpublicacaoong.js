// Modal de Criar Publicação
const modal = document.getElementById("create-post-modal");
const createPostBtn = document.getElementById("create-post-btn");
const closeBtn = document.querySelector(".close-btn");

// Abre o modal quando o botão é clicado
createPostBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Fecha o modal quando o botão de fechar é clicado
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha o modal quando o usuário clica fora dele
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Função para processar o envio da publicação
document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obter os dados do formulário
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const media = document.getElementById("post-media").files[0];

    // Simulação de lógica de publicação
    alert("Publicação criada com sucesso!");

    // Fecha o modal após a publicação
    modal.style.display = "none";

    // Lógica para redirecionar para a página de índice ou exibir a publicação
});