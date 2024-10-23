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

    // Função para localizar o usuário
    function onLocationFound(e) {
        if (e && e.coords) {
            var radius = e.coords.accuracy / 2;
            var latlng = L.latLng(e.coords.latitude, e.coords.longitude);
            L.marker(latlng).addTo(map)
                .bindPopup("Você está dentro de " + radius + " metros deste ponto.")
                .openPopup();
            L.circle(latlng, radius).addTo(map);
        } else {
            console.error("Localização não encontrada", e);
        }
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


