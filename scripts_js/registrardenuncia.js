import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

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
const storage = getStorage(app);
const auth = getAuth(app);

let currentUser = null;

// Listener para mudanças no estado de autenticação
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
        console.log("Usuário está logado:", user.uid);
    } else {
        console.log("Usuário não está logado.");
    }
});

document.getElementById('denuncia-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!currentUser) {
        document.getElementById('message-container').textContent = 'Você precisa estar logado para registrar uma denúncia.';
        document.getElementById('message-container').className = 'alert alert-danger error-message';
        document.getElementById('message-container').style.display = 'block';
        setTimeout(() => {
            document.getElementById('message-container').style.display = 'none';
        }, 8000);
        return;
    }

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value || '';
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;

    // Validação dos campos
    if (!nome || !email || !descricao) {
        document.getElementById('message-container').textContent = 'Por favor, preencha todos os campos obrigatórios.';
        document.getElementById('message-container').className = 'alert alert-danger error-message';
        document.getElementById('message-container').style.display = 'block';
        setTimeout(() => {
            document.getElementById('message-container').style.display = 'none';
        }, 8000);
        return;
    }

    const anexo = document.getElementById('anexos').files[0];

    const denuncia = {
        nome,
        email,
        telefone,
        tipo,
        descricao,
        uid: currentUser.uid,
        createdAt: new Date().toISOString()
    };

    try {
        let urlAnexo = '';
        if (anexo) {
            const storagePath = `denuncia/${anexo.type.startsWith('image/') ? 'imagens' : 'videos'}/${anexo.name}`;
            const storageRef = ref(storage, storagePath);
            await uploadBytes(storageRef, anexo);
            urlAnexo = await getDownloadURL(storageRef);
        }

        const docRef = await addDoc(collection(db, "denuncia"), { ...denuncia, urlAnexo });
        console.log("Denúncia registrada com ID: ", docRef.id);
        
        document.getElementById('message-container').textContent = 'Denúncia registrada com sucesso!';
        document.getElementById('message-container').className = 'alert alert-success success-message';
        document.getElementById('message-container').style.display = 'block';
        setTimeout(() => {
            document.getElementById('message-container').style.display = 'none';
        }, 5000);

        document.getElementById('denuncia-form').reset();
    } catch (e) {
        console.error("Erro ao registrar a denúncia: ", e);
        document.getElementById('message-container').textContent = 'Ocorreu um erro ao registrar a denúncia: ' + e.message;
        document.getElementById('message-container').className = 'alert alert-danger error-message';
        document.getElementById('message-container').style.display = 'block';
        setTimeout(() => {
            document.getElementById('message-container').style.display = 'none';
        }, 5000);
    }
});

