var fs = require("fs");

const myText = fs.readFileSync("data/ign_pokedex.txt").toString();

const mySplitText = myText.split('\t');

let pokemon = [];
let hisuianPokemon = [];

mySplitText.forEach((string, idx) => {
    if (idx % 3 === 1){
        if (string.includes('Hisiuan') || string.includes('Hisuian')) {
            hisuianPokemon.push(string);
            let normalName = string.replace('Hisiuan', '').replace('Hisuian', '').trim()
            pokemon.push(normalName);
        } else if (string.includes('Alolan')) {
            return;
        } else {
            pokemon.push(string)
        }
    }
})


// Log out the cleaned values
// console.log(pokemon)
// console.log(hisuianPokemon)

// finally want to write this to a new json file for easier manipulation
// fs.writeFile() -> lookup this documentation
fs.writeFile('data/pokedex_data.js', pokemon.toString(), () => {
    console.log(`I am writing ${pokemon.length} Pokemon to this file`)
    console.log("Writing Complete!")
})