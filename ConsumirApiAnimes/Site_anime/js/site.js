const url = 'https://localhost:7128/api/Anime';

//pega o json do servidor atraves da api 
function  getItems() {
    fetch(url)
        .then( response => response.json())
        .then( animes => addAnime(animes)) 
}

function criarTable(animes){
    linha = document.createElement("tr");
    tdTitulo = document.createElement("td");
    tdGenero = document.createElement("td"); 
    tdTitulo.innerHTML = animes.titulo;
    tdGenero.innerHTML = animes.genero;

    linha.appendChild(tdTitulo);
    linha.appendChild(tdGenero);

    return linha;
}

//função que add os dados no site
function addTable(animes){
    let table = document.getElementById('table')
    animes.forEach(element => {
        let novalinha = criarTable(element);
        table.appendChild(novalinha);
    });
}


function criarBannerAnime(anime){
    let animeLink = document.createElement("a");
    let animeImage = document.createElement("img");
    let divAnimeName = document.createElement("div");
    animeImage.src = anime.imageUrl;
    animeImage.setAttribute("class","anime-image");
    divAnimeName.innerHTML = anime.titulo;
    divAnimeName.setAttribute("class","titulo-anime");
    animeLink.appendChild(animeImage);
    animeLink.appendChild(divAnimeName);
    animeLink.setAttribute("class","anime-link")
    animeLink.href="#";
    return animeLink;
    
}
function addAnime(animes){
    const poster = document.querySelector(".poster");
    animes.forEach(anime => {
        let novoBanner = criarBannerAnime(anime);
        poster.appendChild(novoBanner);
    });
}