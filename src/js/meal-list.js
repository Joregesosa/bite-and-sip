import "../style.css";

import { loadHeaderFooter, qs, shuffleArray, getParam } from "./utils.js";
import { CategoryNavItem } from "./components/CategoryNavItem.js";
import MealsRequest from "./modules/MealsRequest.mjs";
import { MealCardDetailed } from "./components/MealCard.js";

const mealsRequest = new MealsRequest();

const mealCategories = await mealsRequest.getMealsCategories();
const mealCategoriesContainer = qs("#meal-categories");
let ActiveCategory =
  getParam("category") || mealCategories.categories[0].idCategory;

function renderMealCategories() {
  mealCategoriesContainer.innerHTML = mealCategories.categories
    .map((category) => CategoryNavItem(category, ActiveCategory))
    .join("");
}

function showSelectedCategoryHeaders() {
  const SelectedCategory = mealCategories.categories.find(
    (category) => category.idCategory === ActiveCategory,
  );
  const categoryTitle = qs("h1");
  const categoryDescription = qs("header p");
  categoryTitle.textContent = `${SelectedCategory.strCategory} Culinary Collection`;
  categoryDescription.textContent = SelectedCategory.strCategoryDescription;
}

async function renderMealsByCategory() {
  const categoryName = mealCategories.categories.find(
    (category) => category.idCategory === ActiveCategory,
  ).strCategory;
  const meals = await mealsRequest.getMealsByCategory(categoryName);
  console.log(meals);
  const mealsContainer = qs("#meal-list");
  console.log(mealsContainer);
  mealsContainer.innerHTML = "";
  mealsContainer.innerHTML = meals.meals
    .map((meal) => MealCardDetailed(meal))
    .join("");
}

loadHeaderFooter();
showSelectedCategoryHeaders();
renderMealCategories();
renderMealsByCategory();
