document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const menuItems = navbarMenu.querySelectorAll('a'); // Seleciona todos os itens de menu
    const profileButton = document.getElementById('open-profile-modal'); // Seleciona o botão Meu Perfil
    const closeModalButton = document.getElementById('close-profile-modal'); // Seleciona o botão de fechar o modal

    // Toggle menu
    toggleButton.addEventListener('click', function () {
        navbarMenu.classList.toggle('show');
    });

    // Fecha o menu ao clicar em um item
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            navbarMenu.classList.remove('show');
        });
    });

    // Fecha o menu ao clicar no botão Meu Perfil
    profileButton.addEventListener('click', function () {
        navbarMenu.classList.remove('show'); // Fecha o menu
        document.getElementById('profile-modal').style.display = 'block'; // Exibe o modal
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function (event) {
        if (!navbarMenu.contains(event.target) && !toggleButton.contains(event.target)) {
            navbarMenu.classList.remove('show');
        }
    });

    // Fecha o modal ao clicar no botão de fechar
    closeModalButton.addEventListener('click', function() {
        document.getElementById('profile-modal').style.display = 'none'; // Esconde o modal
    });
});