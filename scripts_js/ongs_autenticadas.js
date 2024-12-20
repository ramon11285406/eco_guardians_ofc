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

// Lista de emails autorizados
const allowedEmails = [
    "jardinsurbanos@gmail.com",
    "faunaprotegida@gmail.com",
    "agualimpa@gmail.com",
    "ecotech@gmail.com",
    "marelimpa@gmail.com",
    "verdevida@gmail.com"
];

const auth = getAuth();
const accessButton = document.getElementById('access-ongs-button');

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Adiciona eventos de fechamento para os modais
document.getElementById('close-not-logged-modal').onclick = () => closeModal('not-logged-modal');
document.getElementById('close-no-permission-modal').onclick = () => closeModal('no-permission-modal');

accessButton.addEventListener('click', (e) => {
    const user = auth.currentUser; // Verifica o usuário atual
    if (!user) {
        e.preventDefault(); // Impede o redirecionamento
        document.getElementById('not-logged-modal').style.display = 'block'; // Mostra o modal de não logado
    } else if (!allowedEmails.includes(user.email)) {
        e.preventDefault(); // Impede o redirecionamento
        document.getElementById('no-permission-modal').style.display = 'block'; // Mostra o modal de sem permissão
    } else {
        window.location.href = 'login_ong.html'; // Acesso autorizado
    }
});