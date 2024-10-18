// scripts.js
// função togle_menu.navbar


// função rodapé
const footer = document.getElementById('meuRodapé');
const offset = 50; // Ajuste o offset conforme necessário

function handleScroll() {
  if (window.scrollY >= document.body.offsetHeight - window.innerHeight - offset) {
    footer.classList.add('show');
  } else {
    footer.classList.remove('show');
  }
}


// document.querySelector('.btn-outline-primary').addEventListener('click', function() {
//   this.classList.toggle('liked'); // Adiciona uma classe para estilizar quando curtido
//   // Adicionar lógica para atualizar contagem de curtidas aqui
// });

// document.querySelector('.btn-primary').addEventListener('click', function() {
//   var commentText = document.querySelector('textarea').value;
//   if (commentText.trim()) {
//       // Adicione lógica para enviar o comentário para o servidor aqui
//       document.querySelector('.comments').insertAdjacentHTML('beforeend', `<div class="comment mb-2"><strong>Você:</strong> ${commentText}</div>`);
//       document.querySelector('textarea').value = ''; // Limpa a textarea após envio
//   } else {
//       alert('Por favor, adicione um comentário.');
//   }
// });

// document.addEventListener('DOMContentLoaded', function() {
//   // Função para curtir um post
//   document.querySelector('.btn-outline-primary').addEventListener('click', function() {
//       this.classList.toggle('liked'); // Alterar o estado do botão de curtir
//       // Lógica adicional para atualizar a contagem de curtidas pode ser adicionada aqui
//   });

//   // Função para enviar um comentário
//   document.querySelector('.btn-primary').addEventListener('click', function() {
//       var commentText = document.querySelector('textarea').value;
//       if (commentText.trim()) {
//           // Lógica para enviar o comentário ao servidor aqui
//           document.querySelector('.comments').insertAdjacentHTML('beforeend', `<div class="comment mb-2"><strong>Você:</strong> ${commentText}</div>`);
//           document.querySelector('textarea').value = ''; // Limpa a textarea após envio
//       } else {
//           alert('Por favor, adicione um comentário.');
//       }
//   });
// });



