const uri = 'api/Anime';
let animes = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

    function addItem() {
        
    const addTituloTextbox = document.getElementById('add-titulo');
    const addGeneroTextbox = document.getElementById('add-genero');
    const addAnoTextbox = document.getElementById('add-ano');
    const addDescricaoTextbox = document.getElementById('add-descricao');
        const item = {
        id: 0,
        titulo: addTituloTextbox.value.trim(),
        genero: addGeneroTextbox.value.trim(),
        ano: addAnoTextbox.value.trim(),
        descricao: addDescricaoTextbox.value.trim()
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
            addTituloTextbox.value = ' ';
        })
        .catch(error => console.error('Não foi possível add item.', error));

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

    document.getElementById('edit-titulo').value = item.titulo;
    document.getElementById('edit-genero').value = item.genero;
    document.getElementById('edit-ano').value = item.ano;
    document.getElementById('edit-descricao').value = item.descricao;
    document.getElementById('editForm').style = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const editTituloTextbox = document.getElementById('edit-titulo');
    const editGeneroTextbox = document.getElementById('edit-genero');
    const editAnoTextbox = document.getElementById('edit-ano');
    const editDescricaoTextbox = document.getElementById('edit-descricao');
    const item = {
        id: parseInt(itemId, 10),
        titulo: editTituloTextbox.value.trim(),
        genero: editGeneroTextbox.value.trim(),
        ano: editAnoTextbox.value.trim(),
        descricao: editDescricaoTextbox.value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error("Não foi possível atualizar item.", error))
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'anime' : 'animes';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('animes');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.titulo);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    animes = data;
}
