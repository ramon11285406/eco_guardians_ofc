document.addEventListener('DOMContentLoaded', function() {
    // Verifica o estado de autenticação
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const loginButton = document.querySelector('.login-btn');
    const profileButton = document.getElementById('profile-button');

    // Mostra ou esconde botões com base no estado de login
    if (isLoggedIn === 'true') {
        loginButton.style.display = 'none'; // Esconde o botão de login
        profileButton.style.display = 'block'; // Mostra o botão de perfil
    } else {
        loginButton.style.display = 'block'; // Mostra o botão de login
        profileButton.style.display = 'none'; // Esconde o botão de perfil
    }

    // Abrir o modal "Meu Perfil"
    document.getElementById('open-profile-modal').addEventListener('click', function() {
        const profileModal = document.getElementById('profile-modal');
        profileModal.style.display = 'block'; // Mostra o modal
    });

    // Função para limpar os inputs
    function clearInputs() {
        document.getElementById('profile-name').value = '';
        document.getElementById('profile-birthdate').value = '';
        document.getElementById('profile-info').value = '';
        document.getElementById('profile-phone').value = '';
        document.getElementById('profile-email').value = ''; 
    }
    // Fechar o modal
    document.getElementById('close-profile-modal').addEventListener('click', function() {
        document.getElementById('profile-modal').style.display = 'none';
        clearInputs(); // Limpa os inputs ao fechar
    });

    // Salvar informações do usuário
    document.getElementById('profile-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const userName = document.getElementById('profile-name').value;
        const userBirthdate = document.getElementById('profile-birthdate').value;
        const userInfo = document.getElementById('profile-info').value;

        // Salva as informações no localStorage
        localStorage.setItem('userName', userName);
        localStorage.setItem('userBirthdate', userBirthdate);
        localStorage.setItem('userInfo', userInfo);

        alert('Informações salvas com sucesso!');

        clearInputs(); // Limpa os inputs após salvar
    });

    // Logout
    document.getElementById('logout-button').addEventListener('click', function() {
        // Lógica de logout do Firebase, se necessário
        localStorage.removeItem('isLoggedIn'); // Remove o estado de login
        localStorage.removeItem('userName'); // Remove o nome do usuário
        localStorage.removeItem('userBirthdate'); // Remove a data de nascimento
        localStorage.removeItem('userInfo'); // Remove outras informações
        window.location.href = 'index.html'; // Redireciona para a página inicial
    });
});