document.addEventListener('DOMContentLoaded', function() {
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const carouselInner = document.querySelector('.carousel-inner');

  let index = 0;

  function showSlide(newIndex) {
      const items = document.querySelectorAll('.carousel-item');
      if (newIndex >= items.length) {
          index = 0;
      } else if (newIndex < 0) {
          index = items.length - 1;
      } else {
          index = newIndex;
      }
      carouselInner.style.transform = `translateX(-${index * 100}%)`;
  }

  prevButton.addEventListener('click', () => showSlide(index - 1));
  nextButton.addEventListener('click', () => showSlide(index + 1));

  // Automatizar a troca de slides
  setInterval(() => showSlide(index + 1), 5000); // Troca a cada 5 segundos
});


// novo trecho 
document.addEventListener('DOMContentLoaded', function () {
    var myCarousel = document.querySelector('#carouselExampleControls');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 5000, // Tempo em milissegundos (5000 ms = 5 segundos)
        ride: 'carousel'
    });
  });