//Seja voluntario

function sejavoluntario() {
    cadastrovoluntario()
    limpatela()
    

    //Adiciona o produto ao banco
    firebase.firestore()
        .collection('sejavoluntario')
        .add(cadastrovoluntario())
        .then(() => {
            limpatela();
            alert("Cadastro efetuado com sucesso.")
        })
        .catch(() => {
            alert("Mensagem não enviada")
        })
}

function limpatela(){
    limpa = document.getElementById('nome-contato').value;
    console.log(limpa)
    limpa.innerHTML="";
    console.log(limpa)
}
//Captura os valores dos formulários e retorna para o cadastro ao banco
function cadastrovoluntario() {
    return {
        nome: form.nome().value,
        email: form.email().value,
        telefone: form.telefone().value,
        ong: form.ong().value,
        interesses: form.interesses().value,
        
    };
}

//captura os valores na página e adiciona às funções
const form = {
    nome: () => document.getElementById('nome-sejavoluntario'),
    email: () => document.getElementById('email-sejavoluntario'),
    telefone: () => document.getElementById('telefone-sejavolutario'),
    ong: () => document.getElementById('ong-sejavoluntario'), 
    interesses: () => document.getElementById('interesses-sejavoluntario'),
}
