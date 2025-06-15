console.log("...ready to fetch cocktails 🍹");

//fetch a random drink from thecocktaildb API
async function fetchRandomDrink() {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await res.json();
    return data.drinks[0];
}

//display a random drink
async function loadDrink(type) {
    const thumb = document.getElementById('drink-thumb');
    const name = document.getElementById('drink-name');
    const glass = document.getElementById('drink-glass');
    const ingredients = document.getElementById('drink-ingredients');
    const instructions = document.getElementById('drink-instructions');

    name.textContent = `${type} drink is loading...`;
    glass.textContent = '';
    ingredients.innerHTML = '';
    instructions.textContent = '';
    thumb.style.display = 'none';

//filter drinks by type
    let drink = null;
    while (!drink || drink.strAlcoholic !== type) {
        drink = await fetchRandomDrink();
    }

    let ingredientsList = '';
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `${measure ? measure.trim() : ''} ${ingredient}<br>`;
        }
    }

//update the UI with the drink details    
    thumb.src = drink.strDrinkThumb;
    thumb.alt = drink.strDrink;
    thumb.style.display = 'block';
    name.textContent = drink.strDrink;
    glass.textContent = drink.strGlass;
    ingredients.innerHTML = ingredientsList;
    instructions.textContent = drink.strInstructions;
}

loadDrink('Non alcoholic');

//collapsibles
const collapsibles = document.getElementsByClassName("collapsible");
Array.from(collapsibles).forEach(button => {
    button.addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

//audio
function play(url) {
    const audio = new Audio(url);
    audio.play();
}