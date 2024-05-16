document.addEventListener("DOMContentLoaded", () => {
  const ingredientInput = document.getElementById("ingredientInput");
  const searchBtn = document.getElementById("searchBtn");
  const recipesContainer = document.getElementById("recipes");

  searchBtn.addEventListener("click", () => {
    const ingredients = ingredientInput.value.trim();

    const appId = "b880fdf8"; // Edamam API ID
    
    const appKey = "8dc1f9bad538f070e680c1ce3e7f16eb"; // Edamam API Key
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.hits) {
          displayRecipes(data.hits);
        } else {
          recipesContainer.innerHTML = "<p>No recipes found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  function displayRecipes(recipes) {
    recipesContainer.innerHTML = "";
    recipes.forEach((recipe) => {
      const recipeHTML = `
                <div class="recipe">
                <div>
                    <h2>${recipe.recipe.label}</h2>
                    <p>By ${recipe.recipe.source}</p>
                    </div>
                    <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
                </div>
                </br>
            `;
      recipesContainer.insertAdjacentHTML("beforeend", recipeHTML);
    });
  }
});
