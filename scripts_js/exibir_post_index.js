import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, doc, getDoc, updateDoc, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
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

// Referências ao Firestore e Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Função para carregar as publicações
async function loadPosts() {
    const postsContainer = document.getElementById('posts');

    // Referência à coleção "posts"
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    // Loop para criar os elementos de cada post
    querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const postId = doc.id;

        const postDiv = document.createElement('div');
        postDiv.classList.add('post', 'mb-4', 'p-3', 'border', 'rounded');

        const title = postData.title || 'Sem título';
        const content = postData.content;
        const mediaUrl = postData.mediaUrl;

        // Obter o número de curtidas
        const likesCount = postData.likes ? postData.likes.length : 0;

        postDiv.innerHTML = `
            <h3 class="post-title">${title}</h3>
            <p class="post-content">${content}</p>
            ${mediaUrl ? `
                ${mediaUrl.includes('youtube.com') || mediaUrl.includes('vimeo.com') ? `
                    <div class="media-container">
                        <iframe src="${mediaUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                ` : `
                    <img src="${mediaUrl}" alt="Post media" class="media-image" />
                `}` : ''}

            <div class="comments mt-3">
                <h4>Comentários</h4>
                <div id="comments-${postId}">
                    <!-- Comentários serão carregados aqui -->
                </div>
                <textarea class="form-control" id="comment-input-${postId}" rows="2" placeholder="Adicione um comentário..."></textarea>
            </div>
            <div class="comment-buttons">
                <button class="btn like-btn" data-post-id="${postId}">
                    <span class="like-text">Curtir</span>
                    <span class="like-count"> ${likesCount}</span>
                </button>
                <button class="btn comment-btn" data-post-id="${postId}">Enviar</button>
            </div>
        `;


        // Adiciona a publicação ao container
        postsContainer.appendChild(postDiv);

        // Carregar os comentários dessa publicação
        loadComments(postId);
    });

    // Atribuindo eventos aos botões
    assignEventListeners();
}

// Função para carregar os comentários de uma publicação
async function loadComments(postId) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const querySnapshot = await getDocs(query(commentsRef, orderBy("createdAt", "asc")));

    // Limpar os comentários antes de carregar novamente
    commentsContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
        const commentData = doc.data();
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment', 'mb-2');

        const userName = "Usuário"; // Aqui você pode buscar o nome do usuário, se necessário.
        const content = commentData.content;
        commentDiv.innerHTML = `<strong>${userName}:</strong> ${content}`;
        
        commentsContainer.appendChild(commentDiv);
    });
}

// Função para curtir uma publicação
async function likePost(postId) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert('Você precisa estar logado para curtir a publicação!');
        return;
    }

    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
        const postData = postDoc.data();

        // Se o usuário já curtiu, não permite outra curtida
        if (!postData.likes.includes(currentUser.uid)) {
            const updatedLikes = [...postData.likes, currentUser.uid];
            await updateDoc(postRef, { likes: updatedLikes });
            alert('Você curtiu a publicação!');

            // Atualizar o número de curtidas na interface
            updateLikesCount(postId);
        } else {
            alert('Você já curtiu esta publicação!');
        }
    }
}

// Função para atualizar o contador de curtidas na interface
async function updateLikesCount(postId) {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
        const postData = postDoc.data();
        const likesCount = postData.likes ? postData.likes.length : 0;
        
        // Encontrar o elemento onde o número de curtidas está sendo exibido
        const likesCountElement = document.querySelector(`[data-post-id="${postId}"]`).parentNode.querySelector('.likes-count');
        if (likesCountElement) {
            likesCountElement.textContent = `${likesCount} curtidas`;
        }
    }
}

// Função para adicionar um comentário
async function addComment(postId) {
    const commentContent = document.getElementById(`comment-input-${postId}`).value;
    if (!commentContent) return;

    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert('Você precisa estar logado para comentar!');
        return;
    }

    const comment = {
        uid: currentUser.uid,
        content: commentContent,
        createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, `posts/${postId}/comments`), comment);
    
    // Recarregar os comentários após adicionar um novo
    document.getElementById(`comment-input-${postId}`).value = ''; // Limpar campo de comentário
    loadComments(postId); // Carregar novamente os comentários
}

// Função para atribuir os eventos de curtir e comentar
function assignEventListeners() {
    // Atribuindo evento de curtir
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            likePost(postId);
        });
    });

    // Atribuindo evento de comentar
    const commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.dataset.postId;
            addComment(postId);
        });
    });
}

// Carregar publicações ao carregar a página
window.onload = loadPosts;
