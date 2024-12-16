import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
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

// Elementos do DOM
const reportsTableBody = document.getElementById('reports-table-body');
const volunteersTableBody = document.getElementById('volunteers-table-body');
const contactsTableBody = document.getElementById('contacts-table-body');

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

// Função para buscar os voluntários
async function fetchVolunteers() {
    const querySnapshot = await getDocs(collection(db, "sejavoluntario"));
    console.log('Voluntários encontrados:', querySnapshot.docs.length); // Log para verificar o número de documentos
    volunteersTableBody.innerHTML = ''; // Limpar tabela antes de preencher

    querySnapshot.forEach(doc => {
        const data = doc.data();
        console.log('Dados do voluntário:', data); // Log para verificar os dados de cada voluntário
        const row = `
            <tr>
                <td>${data.email}</td>
                <td>${data.interesses}</td>
                <td>${data.nome}</td>
                <td>${data.ong}</td>
                <td>${data.telefone}</td>
            </tr>
        `;
        volunteersTableBody.innerHTML += row;
    });
}

// Função para buscar os contatos
async function fetchContacts() {
    const querySnapshot = await getDocs(collection(db, "Contatos"));
    console.log('Contatos encontrados:', querySnapshot.docs.length); // Log para verificar o número de documentos
    contactsTableBody.innerHTML = ''; // Limpar tabela antes de preencher

    querySnapshot.forEach(doc => {
        const data = doc.data();
        console.log('Dados de contato:', data); // Log para verificar os dados de cada contato
        const row = `
            <tr>
                <td>${data.email}</td>
                <td>${data.mensagem}</td>
                <td>${data.nome}</td>
            </tr>
        `;
        contactsTableBody.innerHTML += row;
    });
}

// Função para limpar a tabela
function clearTable(tableBody) {
    tableBody.innerHTML = ''; // Limpa a tabela
}

// Função para pesquisar nas tabelas
function searchTable(searchTerm, tableBody) {
    const rows = tableBody.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchTerm.toLowerCase()));
        row.style.display = match ? '' : 'none';
    });
}

// Aguarda o carregamento do DOM antes de adicionar event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Botões de exibição e limpeza
    document.getElementById('show-all-reports-button').addEventListener('click', fetchReports);
    document.getElementById('clear-reports-table-button').addEventListener('click', () => clearTable(reportsTableBody));

    document.getElementById('show-all-volunteers-button').addEventListener('click', fetchVolunteers);
    document.getElementById('clear-volunteers-table').addEventListener('click', () => clearTable(volunteersTableBody));

    document.getElementById('show-all-contacts-button').addEventListener('click', fetchContacts);
    document.getElementById('clear-contacts-table').addEventListener('click', () => clearTable(contactsTableBody));

    // Navegação entre seções
    document.getElementById('show-reports').addEventListener('click', () => {
        document.getElementById('received-reports').style.display = 'block';
        document.getElementById('create-post').style.display = 'none';
        document.getElementById('volunteers-section').style.display = 'none';
        document.getElementById('contacts-section').style.display = 'none';
    });

    document.getElementById('create-post-btn').addEventListener('click', () => {
        document.getElementById('received-reports').style.display = 'none';
        document.getElementById('create-post').style.display = 'block';
        document.getElementById('volunteers-section').style.display = 'none';
        document.getElementById('contacts-section').style.display = 'none';
    });

    // Modificação para não carregar voluntários e contatos até o clique em "Mostrar Todos"
    document.getElementById('show-volunteers').addEventListener('click', () => {
        document.getElementById('received-reports').style.display = 'none';
        document.getElementById('create-post').style.display = 'none';
        document.getElementById('volunteers-section').style.display = 'block';
        document.getElementById('contacts-section').style.display = 'none';
    });

    document.getElementById('show-contacts').addEventListener('click', () => {
        document.getElementById('received-reports').style.display = 'none';
        document.getElementById('create-post').style.display = 'none';
        document.getElementById('volunteers-section').style.display = 'none';
        document.getElementById('contacts-section').style.display = 'block';
    });

    // Pesquisa nas tabelas
    document.getElementById('search-reports-input').addEventListener('input', (event) => {
        searchTable(event.target.value, reportsTableBody);
    });

    document.getElementById('search-volunteers-input').addEventListener('input', (event) => {
        searchTable(event.target.value, volunteersTableBody);
    });

    document.getElementById('search-contacts-input').addEventListener('input', (event) => {
        searchTable(event.target.value, contactsTableBody);
    });
});
