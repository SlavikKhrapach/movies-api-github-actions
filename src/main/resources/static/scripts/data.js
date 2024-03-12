//wait until the pae loads
window.onload = async function () {
    //fetch the data
    const uri = "http://localhost:3000/api/v1/movies/all";
    const config = {
        method: 'get'
    }

    const response  = await fetch(uri, config);
    const data = await response.json();
    showMovies(data);

   // select the form button and handle form submission
    const button = document.querySelector("button");
    button.onclick = addMovie;
}

async function addMovie(event) {
    event.preventDefault();

    const newMovie = {
        title: document.querySelector("#title").value,
        genre: document.querySelector("#genre").value
    }

    const uri = "http://localhost:3000/api/v1/movies";
    const config = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovie)
    }

    const response = await fetch(uri, config);
    const movie = await response.json();

    const section = document.querySelector("#movies");
    addMovieSection(section, movie);
}

function showMovies(movies) {
    const section = document.querySelector("#movies");
    console.log(section);

    //loop over each of my movies and add
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        addMovieSection(section, movie);
    }
}

function addMovieSection(section, movie) {
    section.innerHTML +=
        `<div class="movie">
                <h2>${movie.title}</h2>
                <p>ID #${movie.id}</p>
                <p>Genre: ${movie.genre}</p>
            </div>`;
}