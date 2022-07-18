const url = 'https://localhost:7128/api/Anime';

//pega o json do servidor atraves da api 
function  getItems() {
    fetch(url)
        .then( response => response.json())
        .then( animes => addAnime(animes)) 
}

function getItemLetter(letter) {
    fetch(url+'/letter/'+letter)
        .then(limparPoster())
        .then( response => response.json())
        .then( animes => addAnime(animes))
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

function limparPoster(){
    const poster =document.querySelector('.poster');
    poster.innerHTML = "";
}