// This app will be to build your team
// will need to look at 
const BASE_POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const BASE_SEREBII_URL = 'https://www.serebii.net/pokemon/';
const mainEl = document.getElementById('main');
const typeContainerEl = document.querySelector('.types-container');
const pokemonContainerEl = document.querySelector('.pokemon-container');
const names = ['snorlax', 'typhlosion', 'decidueye', 'umbreon', 'empoleon', 'heracross'];
const shinyButton = document.querySelector('.shiny');
let isShiny = false;
// Every time we change the state of our currentTeamsType 
let currentTeamsTypes = [];

async function getPokemon(name) {
    const { data } = await axios.get(`${BASE_POKE_API_URL + name}`);
    createPokemonCard(data);
}

shinyButton.addEventListener('click', () => {
    toggleShiny();
    names.forEach(name => getPokemon(name));
})

function createPokemonCard(pokemon) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    addPokemonName(pokemon, cardEl);
    addPokemonTypes(pokemon, cardEl);
    addPokemonImage(pokemon, cardEl);
    addMoreInfoLink(pokemon, cardEl)
    pokemonContainerEl.appendChild(cardEl);
}

function addPokemonName(pokemon, cardEl) {
    const pokemonName = document.createElement('h3');
    pokemonName.classList.add('name');
    pokemonName.innerText = pokemon.name;
    cardEl.appendChild(pokemonName);
}

function addPokemonTypes(pokemon, cardEl) {
    const pokemonTypesContainer = document.createElement('div');
    pokemonTypesContainer.classList.add('type-container');

    updateTeamCoverage(pokemon);

    pokemon.types.forEach(type => {
        const typeEl = document.createElement('p');
        typeEl.classList.add('type');
        typeEl.classList.add(`${type.type.name}`)
        typeEl.innerText = type.type.name;
        pokemonTypesContainer.appendChild(typeEl);
    });

    cardEl.appendChild(pokemonTypesContainer);
}

function addPokemonImage(pokemon, cardEl) {
    const pokemonImage = document.createElement('img');
    // have a background of a white circle and then a linear gradient that is 0 -> 50% white and then 50% -> 100% red
    // pokemonImage.src = pokemon.sprites.front_default;
    // is there a way to store both shiny and default images on the page to avoid unnecessary calls back to the API?
    isShiny ? pokemonImage.src = pokemon.sprites.front_shiny : pokemonImage.src = pokemon.sprites.front_default;
    cardEl.appendChild(pokemonImage);
}

function addMoreInfoLink(pokemon, cardEl) {
    const moreInfoLink = document.createElement('a');
    moreInfoLink.classList.add('info-button');
    moreInfoLink.href = `${BASE_SEREBII_URL + pokemon.name}`;
    moreInfoLink.target = '_blank';
    moreInfoLink.innerText = 'More Info';
    cardEl.appendChild(moreInfoLink);
}

function resetCard() {
    // remove all information from the card for the pokemon
}

function toggleShiny() {
    pokemonContainerEl.innerHTML = '';
    isShiny === true ? isShiny = false : isShiny = true;
}

function updateTeamCoverage(pokemon) {
    pokemon.types.forEach(type => currentTeamsTypes.push(type.type.name))
    currentTeamsTypes = [...new Set(currentTeamsTypes)]

    updateTypesCoverage()

    // iterate over the new currentTeamTypes and set the boolean values of the types hash
}

function updateTypesCoverage() {

}

names.forEach(name => getPokemon(name));


// Do I want to create a type chart that filters for Hisuian Edge Cases?
// this will be a smaller list 

// Need to create a middleware function to accept the API response and 
// change the type values if the name is of a certain value

// Create the Coverage Table
// Will need to generate a hash with all typing and whether or not our current pokemon have coverage type
// 1) Get all the distinct types of our current pokemon
// 2) Create array of distinct types covered
// 3) Clear out the current typing chart
// 4) Iterate over the typing chart state and set covered types to true
let types = { 
    'normal': false,
    'fire': false,
    'water': false,
    'electric': false,
    'grass': false,
    'ice': false,
    'fighting': false,
    'poison': false,
    'ground': false,
    'flying': false,
    'psychic': false,
    'bug': false,
    'rock': false,
    'ghost': false,
    'dragon': false,
    'dark': false,
    'steel': false,
    'fairy': false
}

function buildType(type, isCovered) {
    const typeEl = document.createElement('p');
    typeEl.classList.add(type);
    typeEl.classList.add('type');
    if (!isCovered) typeEl.classList.add('not-covered')
    typeEl.innerText = type;
    typeContainerEl.appendChild(typeEl);
}

function buildTypesTable(types) {
    for (const type in types) {
        buildType(type, types[type]);
    }
}

buildTypesTable(types);

const typesTable = document.createElement('div')

class HisuianTypeUpdate {
    // In this class I want a single interface to pass in the pokemon response and get an outpu
    // of the new typed response

    // Need to know the response for the typing and keep this consistent 

    // for each pokemon we want to check if the pokemon needs to have a type change
    // if so we will run it through a new types builder
    // else we will return the HTTP response
    updateTypes(pokemon) {
        if (pokemonUpdates[pokemon.name]) { return updatedSpecificTypes(pokemon) }
        return pokemon;
    }

    updateSpecificTypes(pokemon) {
        // from the constant in this we will grab the key:value name:arrayOfTypes
        // create an array that we will use to overwrite the array handed to 
        // types 
        // then we will format it with 

        const types = []
    
        pokemon.types = pokemonUpdates[pokemon.name].map((name, index) => {
            this.typesBuilder(index, name);
        })
    }

    typesBuilder(index, name) {
        return { "slot": index++, "type": { "name": name } }
    }
}