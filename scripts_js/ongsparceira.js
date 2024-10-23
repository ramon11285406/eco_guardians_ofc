function procuraongs() {
    firebase.firestore()
        //Acessa a coleção especificada dentro do firebase
        .collection('Ong')

        //Baixa as funções de dentro do firebase e chama a função que as coloca na tela
        .get().then(snapshot => {
            const ongs = snapshot.docs.map(doc => doc.data())
            cleanongsFromScreen()
            addongsToScreen(ongs);
            console.log(ongs)
        })

}

function cleanongsFromScreen(){
    limpa=document.getElementById("contentOngs");
    limpa.innerHTML=""
}

function addongsToScreen(ongs){
    const contentOngs = document.getElementById('contentOngs');

    ongs.forEach(ong => {
        const div= document.createElement('div');
        div.className="col-md-4 mb-4"

            const card = document.createElement("div")
            card.className="card"

                const img = document.createElement("img")
                img.src = ong.logomarca
                img.className = "card-img-top"
                img.alt = ong.altlogomarca
                card.appendChild(img)

                const cardbody = document.createElement("div")
                cardbody.className = "cardbody"

                    const cardtitle = document.createElement("h5")
                    cardtitle.className = "card-title"
                    cardtitle.innerHTML = ong.Nome
                    cardbody.appendChild(cardtitle)  

                    const cardtext = document.createElement("p")
                    cardtext.className = "card-text"
                    cardtext.innerHTML = ong.descricao
                    cardbody.appendChild(cardtext)

                card.appendChild(cardbody)

            div.appendChild(card)

        contentOngs.appendChild(div)
    })

}

procuraongs()