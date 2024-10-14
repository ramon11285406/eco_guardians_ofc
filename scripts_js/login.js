// Importando o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHr2xdklSAhNvlnLdvYo0xEWF5788kH9o",
    authDomain: "eco-guardians-f0c75.firebaseapp.com",
    projectId: "eco-guardians-f0c75",
    storageBucket: "eco-guardians-f0c75.appspot.com",
    messagingSenderId: "705601311103",
    appId: "1:705601311103:web:6f21bf6c27d7d0d24f8a4a"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    function validateFields() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const loginButton = document.getElementById('login-button');
        loginButton.disabled = !(email.trim() !== "" && password.trim() !== "");
    }

    document.getElementById('login-email').addEventListener('input', validateFields);
    document.getElementById('login-password').addEventListener('input', validateFields);

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorMessage = document.getElementById('error-message');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = 'index.html';
            })
            .catch((error) => {
                errorMessage.textContent = 'Email ou senha incorretos.';
                setTimeout(() => {
                    errorMessage.textContent = '';
                }, 2000);
            });
    });

    // Função para mostrar/ocultar a senha
    const passwordInput = document.getElementById('login-password');
    const eyeIcon = document.getElementById('toggle-password');

    eyeIcon.onclick = function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    };

    passwordInput.addEventListener('focus', function() {
        eyeIcon.style.display = 'inline'; // Exibe o ícone
    });

    passwordInput.addEventListener('blur', function() {
        eyeIcon.style.display = 'none'; // Esconde o ícone ao perder o foco
    });


    // cadastro de usuario

    function registro() {
        const email = document.getElementById('register-email').value
        const password = document.getElementById('register-password').value
        firebase.auth().createUserWithEmailAndPassword(email, password
        ).then(() => {
            window.location.href = "../../index.html";
        }).catch(error => {
            alert(error);
        });
    }

    function registro(event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = 'index.html'; // Redireciona após cadastro
            })
            .catch(error => {
                alert(error.message); // Exibe mensagem de erro
            });
    }

    // Adiciona o listener para o formulário de registro
    document.getElementById('register-form').addEventListener('submit', registro);

    

    // Alternância entre seções
    document.querySelector('.forgot-password a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('recover-password-section').classList.remove('d-none');
    };

    document.querySelector('.register a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('register-section').classList.remove('d-none');
    };

    document.querySelector('#recover-password-section .login-link a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        document.getElementById('recover-password-section').classList.add('d-none');
        document.getElementById('login-section').classList.remove('d-none');
    };

    document.querySelector('#register-section .login-link a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        document.getElementById('register-section').classList.add('d-none');
        document.getElementById('login-section').classList.remove('d-none');
    };
});
