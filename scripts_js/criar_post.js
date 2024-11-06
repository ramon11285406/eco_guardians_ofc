import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
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

// Referências ao Firestore, Storage e Auth
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Referência ao formulário de publicação
const postForm = document.getElementById('post-form');
const createPostSection = document.getElementById('create-post');

// Função para criar uma nova publicação
postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert('Você precisa estar logado para criar uma publicação!');
        return;
    }

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const mediaFile = document.getElementById('post-media').files[0];

    // Verificando se a ONG já fez uma publicação nos últimos 7 dias
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("uid", "==", currentUser.uid), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const lastPost = querySnapshot.docs[0];

    if (lastPost && (Timestamp.now().seconds - lastPost.data().createdAt.seconds) < 7 * 24 * 60 * 60) {
        alert('Você só pode criar uma nova publicação a cada 7 dias.');
        return;
    }

    let mediaUrl = "";
    if (mediaFile) {
        // Upload do arquivo para o Firebase Storage
        const storageRef = ref(storage, `posts/${mediaFile.name}`);
        await uploadBytes(storageRef, mediaFile);
        mediaUrl = await getDownloadURL(storageRef);
    }

    const post = {
        title,
        content,
        mediaUrl,
        uid: currentUser.uid,
        createdAt: Timestamp.now(),
        likes: [],
    };

    try {
        // Adicionando a publicação no Firestore
        await addDoc(collection(db, "posts"), post);
        alert('Publicação criada com sucesso!');
        postForm.reset();
    } catch (error) {
        console.error('Erro ao criar a publicação:', error);
        alert('Erro ao criar a publicação.');
    }
});
