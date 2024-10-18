import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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

    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorMessage = document.getElementById('login-error-message');

        console.log("Tentativa de login com:", email, password); // Debugging

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            console.error("Erro ao fazer login:", error); // Log de erro
            errorMessage.textContent = 'Email ou senha incorretos';
            errorMessage.style.display = 'block'; 
            setTimeout(() => {
                errorMessage.textContent = '';
                errorMessage.style.display = 'none'; 
            }, 2000);
        }
    });

    // Função para mostrar/ocultar a senha
    const passwordInputLogin = document.getElementById('login-password');
    const eyeIcon = document.getElementById('toggle-password');

    eyeIcon.onclick = function() {
        const type = passwordInputLogin.type === 'password' ? 'text' : 'password';
        passwordInputLogin.type = type;
    };

    passwordInputLogin.addEventListener('focus', function() {
        eyeIcon.style.display = 'inline'; // Exibe o ícone
    });

    passwordInputLogin.addEventListener('blur', function() {
        eyeIcon.style.display = 'none'; // Esconde o ícone ao perder o foco
    });

    // Cadastro de usuário
    const passwordInputRegister = document.getElementById('register-password'); // Renomeado
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('register-email').value;
        const password = passwordInputRegister.value; // Usando a nova variável
        const errorMessage = document.getElementById('register-error-message');

        // Verifica se a senha tem pelo menos 6 caracteres
        if (password.length < 6) {
            errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            errorMessage.style.color = 'red';
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 2000);
            return; // Impede o envio do formulário
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Limpa os campos do formulário
            document.getElementById('register-email').value = '';
            passwordInputRegister.value = ''; // Usando a nova variável

            // Mostra o modal de sucesso
            const successModal = document.getElementById('success-modal');
            successModal.classList.remove('d-none');

            // Redireciona para a seção de login ao clicar no botão
            document.getElementById('go-to-login').onclick = function() {
                document.getElementById('register-section').classList.add('d-none');
                document.getElementById('login-section').classList.remove('d-none');
                successModal.classList.add('d-none'); // Fecha o modal
            };

            // Fecha o modal ao clicar no "X"
            document.querySelector('.close-button').onclick = function() {
                successModal.classList.add('d-none');
            };
        })
        .catch((error) => {
            const errorMessage = document.getElementById('register-error-message');
            errorMessage.style.color = 'red'; // Define a cor vermelha para a mensagem
        
            if (error.code === 'auth/email-already-in-use') {
                errorMessage.textContent = 'Este email já está em uso.';
            } else {
                errorMessage.textContent = error.message; // Exibe outras mensagens de erro
            }
        
            // Exibe a mensagem por 4 segundos
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 4000);
        });        
    });

    // Manipulação de eventos para o campo de senha no cadastro
    passwordInputRegister.addEventListener('focus', function() {
        const errorMessage = document.getElementById('register-error-message');
        errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        errorMessage.style.color = 'red';
        errorMessage.classList.remove('d-none');
    });

    passwordInputRegister.addEventListener('blur', function() {
        const errorMessage = document.getElementById('register-error-message');
        if (passwordInputRegister.value.length < 6) {
            errorMessage.classList.add('d-none');
        } else {
            errorMessage.style.color = 'green';
            errorMessage.textContent = 'Senha válida!';
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 4000);
        }
    });

    // Recuperação de senha
document.querySelector('.recovery-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Formulário de recuperação enviado!");

    const recoverEmailInput = document.getElementById('recover-email');
    const recoverEmail = recoverEmailInput.value.trim(); // Remove espaços em branco
    const errorMessage = document.getElementById('recover-error-message');

    // Verifique se o e-mail é válido
    if (!recoverEmail) {
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Por favor, insira um e-mail válido.';
        return;
    }

    // Enviar o e-mail de recuperação
    sendPasswordResetEmail(auth, recoverEmail)
        .then(() => {
            console.log("Link de recuperação enviado com sucesso!");
            errorMessage.style.color = 'green';
            errorMessage.textContent = 'Se esse e-mail estiver cadastrado, você receberá um link de recuperação.';

            // Limpar o campo de entrada
            recoverEmailInput.value = '';

            setTimeout(() => {
                errorMessage.textContent = '';
            }, 4000);
        })
        .catch((error) => {
            console.error("Erro ao enviar o link de recuperação:", error.message);
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Se esse e-mail estiver cadastrado, você receberá um link de recuperação.';

            setTimeout(() => {
                errorMessage.textContent = '';
            }, 4000);
        });
});

    

    // Clear inputs
    function clearInputs() {
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('recover-email').value = '';
        document.getElementById('login-error-message').textContent = '';
        document.getElementById('register-error-message').textContent = '';
        document.getElementById('recover-error-message').textContent = '';
    }
    
    // Alternância entre seções
    document.querySelector('.forgot-password a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        clearInputs();
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('recover-password-section').classList.remove('d-none');
    };

    document.querySelector('.register a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        clearInputs();
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('register-section').classList.remove('d-none');
    };

    document.querySelector('#recover-password-section .login-link a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        clearInputs();
        document.getElementById('recover-password-section').classList.add('d-none');
        document.getElementById('login-section').classList.remove('d-none');
    };

    document.querySelector('#register-section .login-link a').onclick = function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        clearInputs();
        document.getElementById('register-section').classList.add('d-none');
        document.getElementById('login-section').classList.remove('d-none');
    };
});
