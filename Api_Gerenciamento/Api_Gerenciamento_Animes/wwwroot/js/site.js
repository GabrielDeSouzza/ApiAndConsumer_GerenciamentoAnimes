const uri = 'api/Anime';
let animes = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error("Não se conectar com Api item.", error));

}

function addItem() {
    const addFirstLetter = document.getElementById("add-firstLetter")    
    const addTitulo = document.getElementById('add-titulo');
    const addGenero = generoToString("selecionado");
    const addAno = document.getElementById('add-ano');
    const addDescricao = document.getElementById('add-descricao');
    const addImageUrl = document.getElementById("add-imageUrl")
        const item = {
        id: 0,
        titulo: addTitulo.value.trim(),
        genero: addGenero,
        ano: addAno.value.trim(),
        descricao: addDescricao.value.trim(),
        imageUrl: addImageUrl.value.trim(),
        firstLetter: addFirstLetter.value.trim()
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addTitulo.value = '';
            addDescricao.value = '';
            addGenero.value = '';
            addImageUrl = '';
            addAno = 0;
            addFirstLetter = '';
        })
        .catch(error => console.error("Não foi possível add item.", error));

    }
function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console("Não foi possível deletar o item.", error));
}

function displayEditForm(id) {
    const item = animes.find(item => item.id === id);
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-titulo').value = item.titulo;
    //passando a string que a api retorna em forma de array para
    //tirar os generos que já estão no anime das opções do select
    addGenerosEditToTable(item.genero.split(", "));
    document.getElementById('edit-ano').value = item.ano;
    document.getElementById('edit-imageUrl').value = item.imageUrl;
    document.getElementById('edit-descricao').value = item.descricao;
    document.getElementById('edit-form').style = 'block';
    document.getElementById("edit-imageload").src = item.imageUrl;
    document.getElementById('edit-firstLetter').value = item.firstLetter;
}

function updateItem() {
    let itemId = document.getElementById('edit-id').value;
    let editTitulo = document.getElementById('edit-titulo');
    let editAno = document.getElementById('edit-ano');
    let editImageUrl = document.getElementById("edit-imageUrl")
    let editDescricao = document.getElementById('edit-descricao');
    let editFirstLetter = document.getElementById('edit-firstLetter');
    let item = {
        id: parseInt(itemId, 10),
        titulo: editTitulo.value.trim(),
        //pegando os generos selecionados e passando em forma de string
        genero: generoToString("selecionado-edit"),
        ano: editAno.value.trim(),
        descricao: editDescricao.value.trim(),
        imageurl: editImageUrl.value.trim(),
        firstLetter: editFirstLetter.value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        /*.then(() => {
            getItems();
            itemId = 0;
            editAno.value = 0;
            editDescricao.value = '';
            /*editGenero.value = '';
            editImageUrl.value = '';
            editTitulo.value = '';
        })*/

        .catch(error => console.error("Não foi possível atualizar item.", error))
    return false;
}

function closeInput() {
    document.getElementById('edit-form').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'anime cadastrado' : 'animes cadastratos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

//cria tabela com os animes já cadastrados no serviço 
function _displayItems(data) {
    const tBody = document.getElementById('animes');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let  textNode = document.createTextNode(item.titulo);
        td1.appendChild(textNode);
        let td2 = tr.insertCell(1);
        td2.appendChild(editButton);

        let td3 = tr.insertCell(2);
        td3.appendChild(deleteButton);
    });

    animes = data;   
}

//permite carregar o link da imagem para o usario
function loadImage(){
    const imageUrl = document.getElementById("add-imageUrl").value;
    const image =  document.getElementById("add-imageload");
    image.src = imageUrl;
}
//add oo genero selecionado pelo usuario na id= tabale-selecionado'
//e retira o genero selecionado da list-genero
function addTableSelecionados(){
    const tBody = document.getElementById('add-generos');
    let selecionado ;
     for(var opcao of document.getElementById('list-genero').options){
        if(opcao.selected){
            selecionado = opcao.value;
            opcao.style.display = 'none';
        }
    }
    let tr = tBody.insertRow(0);
    let td1 = tr.insertCell(0);
    td1.setAttribute("class","selecionado");
    document.createTextNode(selecionado);
    td1.appendChild(document.createTextNode(selecionado));   
    td2 = tr.insertCell(1);
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("onclick", "onCancelGenero(this)")
    button.innerText = "X";
    td2.appendChild(button);
}



// permite o usuario tirar o genero da tabele genero-selecionado
// e manda esse genero de volta para list-genero 
function onCancelGenero(button){
    let volta = document.getElementsByClassName("selecionado");
    for(var opcao of document.getElementById('list-genero')){
        if (opcao.style.display == "none") {
            if (opcao.outerText == volta[button.parentNode.parentNode.rowIndex - 1].textContent)
                opcao.style.display = "block";
        }
    }
    document.getElementById("tabela-selecionado").deleteRow(button.parentNode.parentNode.rowIndex)
}

function editTableSelecionados(){
    const tBody = document.getElementById('edit-generos');
    let selecionado ;
     for(var opcao of document.getElementById('list-genero-edit').options){
        if(opcao.selected){
            selecionado = opcao.value;
            opcao.style.display = 'none';
        }
    }
    let tr = tBody.insertRow(0);
    let td1 = tr.insertCell(0);
    td1.setAttribute("class","selecionado-edit");
    document.createTextNode(selecionado);
    td1.appendChild(document.createTextNode(selecionado));   
    td2 = tr.insertCell(1);
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("onclick", "onCancelGeneroEdit(this)");
    button.innerText = "X";
    td2.appendChild(button);
}

function onCancelGeneroEdit(button){
    let volta = document.getElementsByClassName("selecionado-edit");
    for(var opcao of document.getElementById('list-genero-edit')){
        if(opcao.style.display =="none"){
            if(opcao.textContent == volta[button.parentNode.parentNode.rowIndex - 1].textContent) {
                opcao.style.display = "block";
                document.getElementById("tabela-selecionado-edit").deleteRow(button.parentNode.parentNode.rowIndex)
            }
        }
    }
}

//pega a string 
function addGenerosEditToTable(arrayGeneros){
    let tBody = document.getElementById("edit-generos");
    for(var opcao of document.getElementById("list-genero-edit").options){
        for(i=0; i < arrayGeneros.length; i++){
            if(opcao.value == arrayGeneros[i]){
                opcao.style.display = 'none';
                let tr = tBody.insertRow(0);
                let td1 = tr.insertCell(0);
                td1.setAttribute("class","selecionado-edit");
                document.createTextNode(arrayGeneros[i].value);
                td1.appendChild(document.createTextNode(arrayGeneros[i]));   
                td2 = tr.insertCell(1);
                let button = document.createElement("button");
                button.cloneNode(false);
                button.setAttribute("onclick", "onCancelGeneroEdit(this)")
                button.innerText = "X";
                td2.appendChild(button);
            }
        }
    }

}
//Trasforma o array em uma string
function generoToString(className){
    let generos = document.getElementsByClassName(className);
    let string="";
    for (i = 0; i < generos.length; i++){
        //tirando ", " da ultimo genero 
        if( i == generos.length-1 )
            string+= generos.item(i).textContent
        else
            string += generos.item(i).textContent + ", ";
    }
    return string;
}

function limparTable(table){
    let tr = table.getElementsByTagName('tr');
    for(i=0; i< tr.length; i++)
        tr[i].remove();

}

/*function getTableGenero(){
    let tabela = document.getElementsByClassName("selecionado");
    let generos = [];
    for(i=0; i < tabela.length; i++){
         generos[i] = tabela.item(i).textContent;
    }
    return generos;
}*/

