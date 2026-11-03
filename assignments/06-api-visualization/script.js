
let stats = [];
let statNames = [];
let pokemonName = "";

// Get pokemon data from the API
async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let data = await response.json();

    console.log(data);

    pokemonName = data.name;

    //get pokemon stats
    stats = data.stats.map((stat) => {
        return stat.base_stat;
    });

    //Get the names of the stats
    statNames = data.stats.map((stat) => {
        return stat.stat.name;
    });

    // Show the pokemon name
    let info = document.querySelector("#pokemonInfo");
    info.innerHTML = pokemonName;

    redraw();
}


// search button and load pikachu when the page opens
let button = document.querySelector("#searchButton");
let input = document.querySelector("#pokemonInput");

button.addEventListener("click", () => {
    getPokemon(input.value.toLowerCase());
});

getPokemon("pikachu");


// create the canvas
function setup() {
    let canvas = createCanvas(700, 400);
    canvas.parent("canvasContainer");
}


// draw the pokemon stats
function draw() {
    background(240);

    textSize(20);
    textAlign(CENTER);
    text("Pokemon Stats", 350, 30);

    // draw a bar for each stat
    for (let i = 0; i < stats.length; i++) {

        let barHeight = stats[i] * 1.5;
        let x = 50 + i * 105;
        let y = 320 - barHeight;

        fill(230, 70, 70);
        rect(x, y, 65, barHeight);

        fill(0);
        textSize(14);
        text(stats[i], x + 30, y - 10);

        textSize(12);
        text(statNames[i], x + 30, 345);
    }
}
