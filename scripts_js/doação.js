function mostrarCampos(metodo) {
    document.getElementById('pix-campos').classList.add('d-none');
    document.getElementById('transferencia-campos').classList.add('d-none');
    document.getElementById('boleto-campos').classList.add('d-none');
    
    if (metodo === 'pix') {
        document.getElementById('pix-campos').classList.remove('d-none');
    } else if (metodo === 'transferencia') {
        document.getElementById('transferencia-campos').classList.remove('d-none');
    } else if (metodo === 'boleto') {
        document.getElementById('boleto-campos').classList.remove('d-none');
    }
}