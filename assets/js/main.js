getMoviesData().then(
    function(data){
        data.forEach(element => {
            createElement.createContainerPoster(element.poster, element.title)
            showDescription(data, description);
        });
    }
).then(
    () => {
        setInterval(() => {

            let movies = takeAllMovies();
            
            topMovies.addToTop(movies)
            for(let i = 0 ; i < movies.length ; i++){
                movie = movies[i];
                containerTopMovies.addEventListener('mouseover', () =>{ 
                    movie.addEventListener('click', topMovies.addToTop)
                    topMovies.removeToTop1();
                    topMovies.removeToTop2()
                })
            }
        }, 500)

        buttonShowDescription.addEventListener('click', () => {
            description.classList.toggle('inactive');
        })

        search.addEventListener('keyup', () => {
            let movies = takeAllMovies()
        
            movies.forEach(movie => {
                searchMovie(movie)
            })
            
        })
    }
)
