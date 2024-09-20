window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', function() {
  // Botão para ONGs Parceiras
  document.getElementById('btnOngs').addEventListener('click', function() {
      var content = document.getElementById('contentOngs');
      if (content.classList.contains('show')) {
          content.classList.remove('show');
          this.textContent = 'Veja ONGs Parceiras';
      } else {
          content.classList.add('show');
          this.textContent = 'Esconder ONGs Parceiras';
      }
  });

  // Botão para Recomendações
  document.getElementById('btnRecomendacoes').addEventListener('click', function() {
      var content = document.getElementById('contentRecomendacoes');
      if (content.classList.contains('show')) {
          content.classList.remove('show');
          this.textContent = 'Veja Recomendações';
      } else {
          content.classList.add('show');
          this.textContent = 'Esconder Recomendações';
      }
  });
});