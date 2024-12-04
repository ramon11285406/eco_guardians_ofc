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







