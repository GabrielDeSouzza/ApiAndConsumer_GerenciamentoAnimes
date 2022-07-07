const uri = 'api/Anime';
let animes = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(console.error("Não foi possível atualizar item."));

}

function addItem() {
    const addFirstLetter = document.getElementById("add-firstLetter")    
    const addTituloTextbox = document.getElementById('add-titulo');
    const addGeneroTextbox = document.getElementById('add-genero');
    const addAnoTextbox = document.getElementById('add-ano');
    const addDescricaoTextbox = document.getElementById('add-descricao');
    const addImageUrl = document.getElementById("add-imageUrl")
        const item = {
        id: 0,
        titulo: addTituloTextbox.value.trim(),
        genero: addGeneroTextbox.value.trim(),
        ano: addAnoTextbox.value.trim(),
        descricao: addDescricaoTextbox.value.trim(),
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
            addTituloTextbox.value = '';
            addDescricaoTextbox.value = '';
            addGeneroTextbox.value = '';
            addImageUrl = '';
            addAnoTextbox = 0;
            addFirstLetter = '';
        })
        .catch(error => alert("Erro"));

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
    document.getElementById('edit-genero').value = item.genero;
    document.getElementById('edit-ano').value = item.ano;
    document.getElementById('edit-imageUrl').value = item.imageUrl;
    document.getElementById('edit-descricao').value = item.descricao;
    document.getElementById('edit-form').style = 'block';
    document.getElementById("edit-imageload").src = item.imageUrl;
    document.getElementById('edit-firstLetter').value = item.firstLetter;
}

function updateItem() {
    let itemId = document.getElementById('edit-id').value;
    let editTituloTextbox = document.getElementById('edit-titulo');
    let editGeneroTextbox = document.getElementById('edit-genero');
    let editAnoTextbox = document.getElementById('edit-ano');
    let editImageUrl = document.getElementById("edit-imageUrl")
    let editDescricaoTextbox = document.getElementById('edit-descricao');
    let editFirstLetter = document.getElementById('edit-firstLetter');
    let item = {
        id: parseInt(itemId, 10),
        titulo: editTituloTextbox.value.trim(),
        genero: editGeneroTextbox.value.trim(),
        ano: editAnoTextbox.value.trim(),
        descricao: editDescricaoTextbox.value.trim(),
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
        .then(() => {
            getItems();
            itemId = 0;
            editAnoTextbox.value = 0;
            editDescricaoTextbox.value = '';
            editGeneroTextbox.value = '';
            editImageUrl.value = '';
            editTituloTextbox.value = '';
            alert("Editado com Sucesso!!!");
        })

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



function loadImage(){
    const imageUrl = document.getElementById("add-imageUrl").value;
    const image =  document.getElementById("add-imageload");
    image.src = imageUrl;
}