//doacao

function doacao() {
    cadastrodoacao()
    
    

    //Adiciona o produto ao banco
    firebase.firestore()
        .collection('doacao')
        .add(cadastrodoacao())
        .then(() => {
            // limpatela();
            alert("Doação efetuada com sucesso.")
        })
        .catch(() => {
            alert("Mensagem não enviada")
        })
}

// function limpatela(){
//     limpa = document.getElementById('nome').value;
//     limpa.innerHTML="";
//     limpa = document.getElementById('email').value;
//     limpa.innerHTML="";
//     limpa = document.getElementById('telfone').value;
//     limpa.innerHTML="";
//     limpa = document.getElementById('valor').value;
//     limpa.innerHTML="";
// }
//Captura os valores dos formulários e retorna para o cadastro ao banco
function cadastrodoacao() {
    return {
        nome: form.nome().value,
        email: form.email().value,
        telefone: form.telefone().value,
        valor: form.valor().value,
        metodo: form.metodo().value,
        
    };
}

//captura os valores na página e adiciona às funções
const form = {
    nome: () => document.getElementById('nome'),
    email: () => document.getElementById('email'),
    telefone: () => document.getElementById('telefone'),
    valor: () => document.getElementById('valor'), 
    metodo: () => document.getElementById('metodo'),
}
