//obtener datos de un Pokemon
async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return {
            name: data.name,
            image: data.sprites.front_default,
            description: `Tipo: ${data.types.map(type => type.type.name).join(', ')}`
        };
    } catch (error) {
        console.error('Error:', error);
    }
}

//renderizar un Pokemon
function renderPokemon(pokemon, container) {
    const pokemonElement = document.createElement('div');
    pokemonElement.className = 'pokemon-card';
    pokemonElement.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>${pokemon.description}</p>
    `;
    
    pokemonElement.addEventListener('click', () => {
        selectPokemon(pokemon);
    });
    
    container.appendChild(pokemonElement);
}

//seleccionar un Pokémon
function selectPokemon(pokemon) {
    localStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
    renderSelectedPokemon();
}

//renderizar el Pokemon seleccionado
function renderSelectedPokemon() {
    const selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));
    const container = document.getElementById('selectedPokemon');
    
    if (selectedPokemon) {
        container.innerHTML = `
            <div class="selected-pokemon">
                <h2>Pokémon Seleccionado</h2>
                <img src="${selectedPokemon.image}" alt="${selectedPokemon.name}">
                <h3>${selectedPokemon.name}</h3>
                <p>${selectedPokemon.description}</p>
            </div>
        `;
    }
}

// inicializar la aplicacion
async function init() {
    const pokemonList = document.getElementById('pokemonList');
    
    // Cargar Pokemon seleccionado del localStorage
    renderSelectedPokemon();
    
    //lista de Pokemon
    for (let i = 1; i <= 9; i++) {
        const pokemon = await fetchPokemon(i);
        if (pokemon) {
            renderPokemon(pokemon, pokemonList);
        }
    }
}

// Iniciar la aplicación
init();
