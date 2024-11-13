//Enviar nova mensagem

function enviarmensagem() {
    capturarmensagem()

    //Adiciona o produto ao banco
    firebase.firestore()
        .collection('Contatos')
        .add(capturarmensagem())
        .then(() => {
            limpatela();
            alert("Mensagem enviada")
        })
        .catch((erro) => {
            alert(erro)
        })
}


//Captura os valores dos formulários e retorna para o cadastro ao banco
function capturarmensagem() {
    return {
        nome: form.nome().value,
        email: form.email().value,
        mensagem: form.mensagem().value,
        
    };
}


//captura os valores na página e adiciona às funções
const form = {
    nome: () => document.getElementById('nome-contato'),
    email: () => document.getElementById('email-contato'),
    mensagem: () => document.getElementById('mensagem'),
    
}

function limpatela(){
   limpa = document.getElementById('nome-contato').value;
   console.log(limpa)
   limpa.innerHTML="";
   console.log(limpa)
}
