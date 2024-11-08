import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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

let inactivityTimer;

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, 1 * 60 * 15000); // 15 minutos
}

function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = 'index.html'; // Redireciona para a página inicial
    }).catch((error) => {
        console.error("Erro ao fazer logout:", error);
    });
}

// Adiciona ouvintes de eventos para rastrear a inatividade
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('click', resetTimer);
document.addEventListener('scroll', resetTimer);

document.addEventListener('DOMContentLoaded', function () {
    function validateFields() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const loginButton = document.getElementById('login-button');
        loginButton.disabled = !(email.trim() !== "" && password.trim() !== "");
    }

    document.getElementById('login-email').addEventListener('input', validateFields);
    document.getElementById('login-password').addEventListener('input', validateFields);

    // Login
    document.getElementById('login-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorMessage = document.getElementById('login-error-message');

        console.log("Tentativa de login com:", email, password); // Debugging

        try {
            await signInWithEmailAndPassword(auth, email, password);
            resetTimer(); // Inicia o timer após o login
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

    // Mostrar/ocultar a senha
    const passwordInputLogin = document.getElementById('login-password');
    const eyeIcon = document.getElementById('toggle-password');
    eyeIcon.onclick = function () {
        const type = passwordInputLogin.type === 'password' ? 'text' : 'password';
        passwordInputLogin.type = type;
    };

    passwordInputLogin.addEventListener('focus', function () {
        eyeIcon.style.display = 'inline'; // Exibe o ícone
    });

    passwordInputLogin.addEventListener('blur', function () {
        eyeIcon.style.display = 'none'; // Esconde o ícone ao perder o foco
    });

    // Cadastro de usuário
    const passwordInputRegister = document.getElementById('register-password');
    const confirmpasswordInputRegister = document.getElementById('repeat-password');
    const errorMessage = document.getElementById('register-error-message'); // Para mostrar as mensagens de erro

    // Função de validação de senha em tempo real
    function validatePassword() {
        const password = passwordInputRegister.value;
        const repeatpassword = confirmpasswordInputRegister.value;

        // Se a senha tiver menos de 6 caracteres, exibe mensagem de erro
        if (password.length < 6) {
            errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            errorMessage.style.color = 'red';
            errorMessage.classList.remove('d-none'); // Torna a mensagem visível
        } 
        // Se a senha tiver 6 ou mais caracteres e não houver o campo de confirmação de senha preenchido
        else if (password.length >= 6 && !repeatpassword) {
            errorMessage.textContent = 'Senha válida!';
            errorMessage.style.color = 'green';
            errorMessage.classList.remove('d-none'); // Torna a mensagem visível
            setTimeout(() => {
                errorMessage.textContent = ''; // Limpa a mensagem após 5 segundos
                errorMessage.classList.add('d-none'); // Torna a mensagem invisível
            }, 5000);
        } 
        // Quando o campo de senha e confirmação de senha não coincidem
        else if (password !== repeatpassword && repeatpassword.length > 0) {
            errorMessage.textContent = "As senhas não conferem";
            errorMessage.style.color = 'red';
            errorMessage.classList.remove('d-none'); // Torna a mensagem visível
        } 
        // Se as senhas coincidirem, remove qualquer mensagem
        else if (password === repeatpassword) {
            errorMessage.textContent = ''; // Limpa a mensagem
            errorMessage.classList.add('d-none'); // Torna a mensagem invisível
        }
    }

    // Adicionando o evento 'input' nos campos de senha para validar enquanto o usuário digita
    passwordInputRegister.addEventListener('input', validatePassword);
    confirmpasswordInputRegister.addEventListener('input', validatePassword);

    // Cadastro de novo usuário
    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('register-email').value;
        const password = passwordInputRegister.value;
        const repeatpassword = confirmpasswordInputRegister.value;
        const displayName = document.getElementById('register-display-name').value;

        // Se houver erro nas senhas, não submete o formulário
        if (password.length < 6) {
            errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            errorMessage.style.color = 'red';
            errorMessage.classList.remove('d-none'); // Torna a mensagem visível
            return; // Impede o envio do formulário
        } else if (password !== repeatpassword) {
            errorMessage.textContent = "As senhas não conferem";
            errorMessage.style.color = 'red';
            errorMessage.classList.remove('d-none'); // Torna a mensagem visível
            return; // Impede o envio do formulário
        }

        // Criação do usuário no Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Limpa os campos do formulário
                document.getElementById('register-email').value = '';
                passwordInputRegister.value = '';
                confirmpasswordInputRegister.value = '';
                document.getElementById('register-display-name').value = '';

                // Atualiza o nome do usuário no Firebase Authentication
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: displayName // Atualiza o nome
                });

                // Console log para verificar se o nome foi atualizado
                console.log("Nome atualizado com sucesso:", user.displayName);

                // Exibe o modal de sucesso
                const successModal = document.getElementById('success-modal');
                successModal.classList.remove('d-none');

                // Redireciona para a seção de login ao clicar no botão
                document.getElementById('go-to-login').onclick = function () {
                    document.getElementById('register-section').classList.add('d-none');
                    document.getElementById('login-section').classList.remove('d-none');
                    successModal.classList.add('d-none'); // Fecha o modal
                };

                // Fecha o modal ao clicar no "X"
                document.querySelector('.close-button').onclick = function () {
                    successModal.classList.add('d-none');
                };
            })
            .catch((error) => {
                const errorMessage = document.getElementById('register-error-message');
                errorMessage.style.color = 'red';

                if (error.code === 'auth/email-already-in-use') {
                    errorMessage.textContent = 'Este email já está em uso.';
                } else {
                    errorMessage.textContent = error.message;
                }

                setTimeout(() => {
                    errorMessage.textContent = '';
                }, 4000);
            });
    });



    // Recuperação de senha
    document.querySelector('.recovery-form').addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("Formulário de recuperação enviado!");

        const recoverEmailInput = document.getElementById('recover-email');
        const recoverEmail = recoverEmailInput.value.trim(); // Remove espaços em branco
        const errorMessage = document.getElementById('recover-error-message');

        if (!recoverEmail) {
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Por favor, insira um e-mail válido.';
            return;
        }

        sendPasswordResetEmail(auth, recoverEmail)
            .then(() => {
                console.log("Link de recuperação enviado com sucesso!");
                errorMessage.style.color = 'green';
                errorMessage.textContent = 'Se esse e-mail estiver cadastrado, você receberá um link de recuperação.';

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
        e.preventDefault();
        clearInputs();
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('recover-password-section').classList.remove('d-none');
    };

    document.querySelector('.register a').onclick = function(e) {
        e.preventDefault();
        clearInputs();
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('register-section').classList.remove('d-none');
    };

    document.querySelector('#recover-password-section .login-link a').onclick = function(e) {
        e.preventDefault();
        clearInputs();
        document.getElementById('recover-password-section').classList.add('d-none');
        document.getElementById('login-section').classList.remove('d-none');
    };

    document.querySelector('#register-section .login-link a').onclick = function(e) {
        e.preventDefault();
        clearInputs();
        document.getElementById('register-section').classList.add('d-none');
        document.getElementById('login-section').classList.remove('d-none');
    };
});
