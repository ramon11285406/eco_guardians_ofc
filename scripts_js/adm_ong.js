import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

// Configuração do Firebase
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
const db = getFirestore(app);
const auth = getAuth(app);
const reportsTableBody = document.getElementById('reports-table-body');

// Função para buscar as denúncias
async function fetchReports() {
    const querySnapshot = await getDocs(collection(db, "denuncia"));
    reportsTableBody.innerHTML = ''; // Limpar tabela antes de preencher

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const row = `
            <tr>
                <td>${data.nome}</td>
                <td>${data.email}</td>
                <td>${data.telefone || '-'}</td>
                <td>${data.tipo}</td>
                <td>${data.descricao}</td>
                <td>${new Date(data.createdAt).toLocaleString()}</td>
                <td>
                    ${data.urlAnexo ? `<a href="${data.urlAnexo}" target="_blank">Ver Anexo</a>` : '-' }
                </td>
            </tr>
        `;
        reportsTableBody.innerHTML += row;
    });
}

// Função para limpar a tabela
function clearTable() {
    reportsTableBody.innerHTML = ''; // Limpa a tabela
}

// Aguarda o carregamento do DOM antes de adicionar event listeners
document.addEventListener("DOMContentLoaded", () => {
    const fetchReportsButton = document.getElementById('show-all-button');
    const clearTableButton = document.getElementById('clear-table-button');

    if (fetchReportsButton) {
        fetchReportsButton.addEventListener('click', fetchReports);
    } else {
        console.error("Botão de Exibir Denúncias não encontrado.");
    }

    if (clearTableButton) {
        clearTableButton.addEventListener('click', clearTable);
    } else {
        console.error("Botão de Limpar Tabela não encontrado.");
    }

    // Adiciona o listener para o campo de pesquisa
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = reportsTableBody.getElementsByTagName('tr');

            Array.from(rows).forEach(row => {
                const cells = row.getElementsByTagName('td');
                const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm));
                row.style.display = match ? '' : 'none';
            });
        });
    } else {
        console.error("Campo de pesquisa não encontrado.");
    }
});
