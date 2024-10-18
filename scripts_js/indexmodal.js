import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHr2xdklSAhNvlnLdvYo0xEWF5788kH9o",
    authDomain: "eco-guardians-f0c75.firebaseapp.com",
    projectId: "eco-guardians-f0c75",
    storageBucket: "eco-guardians-f0c75.appspot.com",
    messagingSenderId: "705601311103",
    appId: "1:705601311103:web:6f21bf6c27d7d0d24f8a4a"
};

// Inicializa o Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-btn');
    const profileButton = document.getElementById('profile-button');

    // Verifica o estado de autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginButton.style.display = 'none'; // Esconde o botão de login
            profileButton.style.display = 'block'; // Mostra o botão de perfil
        } else {
            loginButton.style.display = 'block'; // Mostra o botão de login
            profileButton.style.display = 'none'; // Esconde o botão de perfil
        }
    });

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
    document.getElementById('logout-button').addEventListener('click', async function() {
        await auth.signOut(); // Faz logout no Firebase
        window.location.href = 'index.html'; // Redireciona para a página inicial
    });
});
