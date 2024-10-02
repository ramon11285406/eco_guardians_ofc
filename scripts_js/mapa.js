// Inicializa o mapa interativo (exemplo usando Leaflet)
document.addEventListener('DOMContentLoaded', function() {
    // Cria o mapa e define a visualização inicial
    var map = L.map('map').setView([-1.4485051,-48.4944396], 13);

    // Adiciona o layer de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adiciona um marcador de exemplo
    L.marker([-1.4485051,-48.4944396]).addTo(map)
        .bindPopup('Um lugar interessante.')
        .openPopup();
s
    // Função para localizar o usuário
    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("Você está dentro de " + radius + " metros deste ponto.")
            .openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    // Função para tratar erros de localização
    function onLocationError(e) {
        alert(e.message);
    }

    // Verifica se o navegador suporta a localização
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError);
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }
});


