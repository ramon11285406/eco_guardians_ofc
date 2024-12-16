//Seja voluntario

function sejavoluntario() {
    cadastrovoluntario()
    
    

    //Adiciona o produto ao banco
    firebase.firestore()
        .collection('sejavoluntario')
        .add(cadastrovoluntario())
        .then(() => {
            // limpatela();
            alert("Cadastro efetuado com sucesso.")
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
//     limpa = document.getElementById('telefone').value;
//     limpa.innerHTML="";
//     limpa = document.getElementById('interesses').value;
//     limpa.innerHTML="";
// }
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
    nome: () => document.getElementById('nome'),
    email: () => document.getElementById('email'),
    telefone: () => document.getElementById('telefone'),
    ong: () => document.getElementById('ong'), 
    interesses: () => document.getElementById('interesses'),
}
