import "../style.css";
import { loadHeaderFooter, qs, getParam } from "./utils.js";
import MealsRequest from "./modules/MealsRequest.mjs";
import GeminiRequest from "./modules/GeminiRequest.mjs";
import {
  MealDetailsHero,
  MealMeasureIngredientItem,
  MealOverview,
  MealPreparationItem,
} from "./components/MealDetails.js";

const mealsRequest = new MealsRequest();
const mealData = await mealsRequest.getMealById(getParam("meal"));
const meal = mealData.meals[0];
const ingredients = mealsRequest.extractValuesByPrefix(
  mealData,
  "strIngredient",
);

/**
 * Renders the hero section with the meal category.
 */
function displayDetailsHero() {
  const detailsHero = qs("#details-hero");
  detailsHero.innerHTML = MealDetailsHero(meal.strCategory);
}

/**
 * Fetches a Gemini-generated description and renders the meal overview.
 */
async function displayMealOverview() {
  const mealOverview = qs("#meal-overview");
  const geminiRequest = new GeminiRequest({
    mealName: meal.strMeal,
    ingredients: ingredients.join(", "),
    area: meal.strArea,
  });
  const description = await geminiRequest.getResponse();
  mealOverview.innerHTML = MealOverview(meal, description);
}

/**
 * Fetches a Gemini-generated customer satisfaction comment and renders it in the designated section.
 */
async function customerSatisfaction() {
  const geminiRequest = new GeminiRequest({
    mealName: meal.strMeal,
    ingredients: ingredients.join(", "),
    area: meal.strArea,
    type: "customer satisfaction comment",
    maxCharacters: 200,
  });
  const satisfaction = await geminiRequest.getResponse();
  const customerSatisfaction = qs("#customer-satisfaction");
  customerSatisfaction.textContent = satisfaction;
}

/**
 * Renders the preparation steps list.
 */
function displayMealInstructions() {
  const instructions = meal.strInstructions
    .split("\r\n")
    .filter((step) => step.trim() !== "" && !step.includes("step"));
  const mealInstructions = qs("#instructions-list");
  mealInstructions.innerHTML = instructions
    .map((step, index) => MealPreparationItem({ step, index }))
    .join("");
}

/**
 * Renders the ingredients and measures list.
 */
function displayMealIngredients() {
  const measures = mealsRequest.extractValuesByPrefix(mealData, "strMeasure");
  const measureIngredientsList = qs("#measure-ingredients");
  measureIngredientsList.innerHTML = ingredients
    .map((ingredient, index) => {
      const measure = measures[index] || "";
      return MealMeasureIngredientItem(measure, ingredient);
    })
    .join("");
}

/**
 * Embeds the YouTube video using the Lite YouTube component.
 */
function displayMealVideo() {
  const mealVideo = qs("#meal-video");
  const videoId = meal.strYoutube.split("v=")[1];
  mealVideo.innerHTML =
    /*html*/
    `
        <lite-youtube videoid="${videoId}"></lite-youtube>
  `;
}

loadHeaderFooter();
displayDetailsHero();
displayMealOverview();
customerSatisfaction();
displayMealInstructions();
displayMealIngredients();
displayMealVideo();
