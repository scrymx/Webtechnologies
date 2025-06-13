console.log("...ready to fetch cocktails 🍹");

// Prepare DOM elements
const titleContainer = document.querySelector("[data-js='title']");
const imgContainer = document.querySelector("[data-js='photo']");
const instructionsContainer = document.querySelector("[data-js='instructions']");
const ingredientsContainer = document.querySelector("[data-js='ingredients']");
const glassContainer = document.querySelector("[data-js='glass']");

// Display drink in the DOM
function displayDrink(drink) {
  titleContainer.innerHTML = drink.strDrink;

  let ingredientsList = "";
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredientsList += `${measure ? measure.trim() : ""} ${ingredient}<br>`;
    }
  }

  ingredientsContainer.innerHTML = ingredientsList;
  instructionsContainer.innerHTML = drink.strInstructions;
  glassContainer.innerHTML = drink.strGlass;

  imgContainer.innerHTML = "";
  const img = document.createElement("img");
  img.src = drink.strDrinkThumb;
  img.alt = drink.strDrink;
  imgContainer.appendChild(img);
}

// Fetch filtered drink
function loadDrink(alcoholicType) {
  let attempts = 0;

  async function tryFetch() {
    attempts++;
    const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const data = await res.json();
    const drink = data.drinks[0];

    if (drink.strAlcoholic === alcoholicType || attempts >= 10) {
      displayDrink(drink);
    } else {
      tryFetch();
    }
  }

  tryFetch();
}

// Button event listeners
document.querySelector("[data-js='btn-alcoholic']").addEventListener("click", () => {
  loadDrink("Alcoholic");
});

document.querySelector("[data-js='btn-non-alcoholic']").addEventListener("click", () => {
  loadDrink("Non alcoholic");
});

// Collapsibles
const collapsibles = document.getElementsByClassName("collapsible");
Array.from(collapsibles).forEach(button => {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});
