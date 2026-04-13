import "../style.css";
import { loadHeaderFooter, qs, shuffleArray } from "./utils.js";
import MealsRequest from "./modules/MealsRequest.mjs";
import GeminiRequest from "./modules/GeminiRequest.mjs";
import { CategoryCard } from "./components/CategoryCard.js";
import { MealCard } from "./components/MealCard.js";

const mealsRequest = new MealsRequest();

/**
 * Fetches a random meal and renders the hero section with its name, image, and Gemini-generated description.
 */
async function displayMeal() {
  const data = await mealsRequest.getRandomMeal();
  const meal = data.meals[0];
  const ingredients = mealsRequest
    .extractValuesByPrefix(data, "strIngredient")
    .join(", ");
  const formattedMealName = meal.strMeal.replace(
    /(\w+)(\s+)(\w+)/,
    '$1$2<span class="text-primary italic">$3</span>',
  );
  const geminiRequest = new GeminiRequest({
    mealName: meal.strMeal,
    ingredients,
    area: meal.strArea,
  });
  const description = await geminiRequest.getResponse();

  qs("#hero img").src = meal.strMealThumb;
  qs("#hero h1").innerHTML = formattedMealName;
  qs("#hero p").textContent = description;
  qs("#preparation-details").href =
    `/meals/meal-details.html?meal=${meal.idMeal}`;
}

/**
 * Fetches and renders 3 random meal categories. Returns one remaining category for use in displayTopMeals.
 */
async function displayTopCategories() {
  const categories = await mealsRequest.getMealsCategories();
  const shuffledCategories = shuffleArray(categories.categories);
  const reservedCategory = shuffledCategories.pop().strCategory;
  qs("#category-list").innerHTML = shuffledCategories
    .slice(0, 3)
    .map((category) => CategoryCard(category))
    .join("");
  return reservedCategory;
}

/**
 * Fetches and renders 3 random meals from the given category.
 */
async function displayTopMeals(category) {
  const meals = await mealsRequest.getMealByCategory(category);
  const shuffledMeals = shuffleArray(meals.meals);
  qs("#meal-list").innerHTML = shuffledMeals
    .slice(0, 3)
    .map((meal) => MealCard(meal))
    .join("");
}

loadHeaderFooter();
displayMeal();
const mealCategory = await displayTopCategories();
await displayTopMeals(mealCategory);
