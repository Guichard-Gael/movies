/* Element HTML */
const buttonShowDescription = document.querySelector('.show');
const description = document.querySelector('.descriptionMovie');
const listMovies = document.querySelector('.listMovies');
const containerTopMovies = document.querySelector('.containerTopMovies');
let containerTop1 = document.querySelector('.containerMovie1');
let containerTop2 = document.querySelector('.containerMovie2');
const search  = document.querySelector('.search');

/* Récupération des données */
async function getMoviesData(){
    const requete = await fetch("/assets/moviesData/dataMovies.json")

    if (!requete.ok) {
        alert('Un problème est survenu.')
    }
    else{
        let data = await requete.json();
        return data
    }
}

/* Récupération de tout les films dans un tableau */
function takeAllMovies (){
    let allMovies = document.querySelectorAll('.listMovies .containerPoster');
    return allMovies;
}

/* Création de chaque films en HTML + association du CSS */
const createElement = {
    createContainerPoster(photo, title) {   
        const divContainerPoster = document.createElement('div');
        divContainerPoster.classList.add('containerPoster');
        listMovies.appendChild(divContainerPoster);
        createElement.createPoster(divContainerPoster, photo);
        createElement.createTitleMovie(divContainerPoster, title);
    },
    createPoster(container, photo){
        const poster = document.createElement('img');
        poster.classList.add('poster');
        poster.src = photo;
        container.appendChild(poster)
    },
    createTitleMovie(container, title){
        const titleMovie = document.createElement('p');
        titleMovie.classList.add('titleMovie');
        titleMovie.textContent = title;
        container.appendChild(titleMovie);
    }
}

/* Gestion de la section "Mon top 2" */
const topMovies = {
    addToTop(movies){
        // console.log(movies);
        movies.forEach(movie => {
            movie.removeEventListener('click', topMovies.removeToTop1)
            movie.addEventListener('click', topMovies.addToTopCondition)   
        })       
    },
    addToTopCondition(e){
        if (containerTop1.children.length === 1) {
            let movieRemove1 = listMovies.removeChild(e.path[1]);
            movieRemove1.classList.add('noMargin')
            return containerTop1.appendChild(movieRemove1);
        }
        else if(containerTop2.children.length === 1){
            let movieRemove2 = listMovies.removeChild(e.path[1]);
            movieRemove2.classList.add('noMargin')
            return containerTop2.appendChild(movieRemove2);
        }
        else{
            alert('Vous ne pouvez pas choisir plus de deux films.')
        }
    },
    removeToTop1(){   
        let movieRemove = containerTop1.lastChild;
        movieRemove.removeEventListener('click', topMovies.addToTopCondition)
        movieRemove.addEventListener('click', topMovies.removeTop1Movie)
        let lastMovie = listMovies.lastChild
        lastMovie.removeEventListener('click', topMovies.removeTop1Movie)
    },
    removeTop1Movie(e){
        containerTop1.removeChild(e.path[1])
        listMovies.appendChild(e.path[1]);  
        e.path[1].classList.remove('noMargin')  
    },
    removeToTop2(){
        let movieRemove2 = containerTop2.lastChild;
        movieRemove2.removeEventListener('click', topMovies.addToTopCondition)
        movieRemove2.addEventListener('click', topMovies.removeTop2Movie)
        
        let lastMovie = listMovies.lastChild
        lastMovie.removeEventListener('click', topMovies.removeTop2Movie)
    },
    removeTop2Movie(e){
        containerTop2.removeChild(e.path[1])
        listMovies.appendChild(e.path[1]);
        e.path[1].classList.remove('noMargin')
    }
}

/* Affichage de la description des films au survole */
function showDescription(data, descriptionMovie){
    for(let i = 0; i < takeAllMovies().length; i++){
        takeAllMovies()[i].addEventListener('mouseover', () => {
            descriptionMovie.textContent = data[i].description;
        })
    }
}

/* Filtre recherche film */
function searchMovie(movie){
    if(movie.innerText.toLowerCase().search(search.value.toLowerCase()) === -1){   
        movie.classList.add('hidden');
    }else{
        if(movie.classList = 'containerPoster hidden'){
            movie.classList.remove('hidden');
        }
    }
}

