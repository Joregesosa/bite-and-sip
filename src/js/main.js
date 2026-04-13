import "../style.css";
import { loadHeaderFooter, qs, shuffleArray } from "./utils.js";
import MealsRequest from "./modules/MealsRequest.mjs";
import GeminiRequest from "./modules/GeminiRequest.mjs";
import { CategoryCard } from "./components/CategoryCard.js";
import { MealCard } from "./components/MealCard.js";
import { CULINARY_FACT_PROMPT } from "./consts.js";

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
  const reservedCategory = shuffledCategories.pop();
  qs("#category-list").innerHTML = shuffledCategories
    .slice(0, 3)
    .map((category) => CategoryCard(category))
    .join("");
  return reservedCategory;
}

/**
 * Fetches and renders 3 random meals from the given category.
 */
async function displayTopMeals({ strCategory, idCategory }) {
  const meals = await mealsRequest.getMealsByCategory(strCategory);
  const shuffledMeals = shuffleArray(meals.meals);
  qs("#load-more-meals").href = `/meals/index.html?category=${idCategory}`;
  qs("#meal-list").innerHTML = shuffledMeals
    .slice(0, 6)
    .map((meal) => MealCard(meal))
    .join("");
}

/**
 * Fetches a culinary fact from Gemini and renders it in the culinary-fact section.
 */
async function displayCulinaryFact() {
  const gemini = new GeminiRequest({ rawPrompt: CULINARY_FACT_PROMPT });
  const fact = await gemini.getResponse();
  qs("#culinary-fact-text").textContent = fact;
}

loadHeaderFooter();
displayMeal();
displayCulinaryFact();
const mealCategory = await displayTopCategories();
await displayTopMeals(mealCategory);
