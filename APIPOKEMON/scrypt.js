document.getElementById("button").addEventListener("click", function () {
    const xhr = new XMLHttpRequest();
     document.getElementById("resultat").innerHTML = ""
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            console.log(response);
            pintarPokemon(response);
        }
    });

    const nom1 = document.getElementById("nom1").value;
    xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/` + nom1);
    xhr.send();
})




document.getElementById("tots").addEventListener("click", function () {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            console.log(response);
             document.getElementById("resultat").innerHTML = ""
            for (let i = 0; i < response.results.length; i++) {

                const xhr1 = new XMLHttpRequest();

                xhr1.addEventListener('readystatechange', function () {
                    if (this.readyState === this.DONE) {
                        const response = JSON.parse(this.responseText);
                        console.log(response)
                        
                        pintarPokemon(response);
                    }
                });

                xhr1.open('GET', response.results[i].url);
                xhr1.send();

            }
        }
    });

    xhr.open('GET', `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    xhr.send();
})


document.getElementById("tipo").addEventListener("click", function () {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            console.log(response);
             document.getElementById("resultat").innerHTML = ""

            let tipo = document.getElementById("gibet").value;

            for (let i = 0; i < response.results.length; i++) {

                const xhr1 = new XMLHttpRequest();

                xhr1.addEventListener('readystatechange', function () {
                    if (this.readyState === this.DONE) {
                        const response = JSON.parse(this.responseText);
                        console.log(response)


                        
                        if(response.types[0].type.name == tipo){
                            pintarPokemon(response);
                        }
                        
                    }
                });

                xhr1.open('GET', response.results[i].url);
                xhr1.send();

            }
        }
    });

    xhr.open('GET', `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    xhr.send();
})



document.getElementById("pes").addEventListener("click", function () {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const response = JSON.parse(this.responseText);
            console.log(response);
            document.getElementById("resultat").innerHTML = "";

            let pes = parseFloat(document.getElementById("pesito").value);
            const minPes = pes - 5; 
            const maxPes = pes + 5;

            for (let i = 0; i < response.results.length; i++) {
                const xhr1 = new XMLHttpRequest();

                xhr1.addEventListener('readystatechange', function () {
                    if (this.readyState === this.DONE) {
                        const pokemonData = JSON.parse(this.responseText);
                        console.log(pokemonData);

                        
                        if (pokemonData.weight >= minPes && pokemonData.weight <= maxPes) {
                            pintarPokemon(pokemonData);
                        }
                    }
                });

                xhr1.open('GET', response.results[i].url);
                xhr1.send();
            }
        }
    });

    xhr.open('GET', `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    xhr.send();
});

const typeIcons = {
    "fire": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/10.png",
    "water": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/11.png",
    "grass": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/12.png",
    "electric": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/13.png",
    "rock": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/6.png",
    "ground": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/5.png",
    "flying": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png",
    "bug": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/7.png",
    "dark": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/17.png",
    "dragon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/16.png",
    "fairy": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/18.png",
    "fighting": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/2.png",
    "ghost": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/8.png",
    "ice": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/15.png",
    "normal": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/1.png",
    "poison": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/4.png",
    "psychic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/14.png",
    "steel": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/9.png"
};


function pintarPokemon(pokemon) {

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const nom = document.createElement("h2");
    nom.textContent = pokemon.name.toUpperCase();

    const imatge = document.createElement("img");
    imatge.src = pokemon.sprites.front_default;
    imatge.alt = pokemon.name;

    const pes = document.createElement("p");
    pes.textContent = `Peso: ${pokemon.weight / 10} kg`;

    const tipusContainer = document.createElement("div");
    tipusContainer.classList.add("types-container");

    pokemon.types.forEach((typeInfo) => {
        const type = typeInfo.type.name;

        const typeIcon = document.createElement("img");
        typeIcon.src = typeIcons[type] || "";
        typeIcon.alt = type;
        typeIcon.title = type;
        typeIcon.classList.add("type-icon");

        tipusContainer.appendChild(typeIcon);
    });

    card.appendChild(nom);
    card.appendChild(imatge);
    card.appendChild(pes);
    card.appendChild(tipusContainer);

    document.getElementById("resultat").appendChild(card);
}