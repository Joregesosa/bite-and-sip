import "../style.css";

import {
  loadHeaderFooter,
  qs,
  getParam,
  attachFavoritesListener,
  isMealFavorite,
} from "./utils.js";
import { CategoryNavItem } from "./components/CategoryNavItem.js";
import MealsRequest from "./modules/MealsRequest.mjs";
import { MealCard } from "./components/MealCard.js";
import { LazyRenderer } from "./modules/LazyRenderer.mjs";

const mealsContainer = qs("#meal-list");
const mealCategoriesContainer = qs("#meal-categories");

const mealsRequest = new MealsRequest();
const mealCategories = await mealsRequest.getMealsCategories();

let ActiveCategory =
  getParam("category") || mealCategories.categories[0].idCategory;
let mealsFromCategory = [];

const lazyRenderer = new LazyRenderer({
  container: mealsContainer,
  sentinel: document.querySelector("#scroll-sentinel"),
  renderItem: (meal) => MealCard(meal, isMealFavorite(meal.idMeal)),
});

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
  mealsFromCategory = meals.meals;
  lazyRenderer.load(mealsFromCategory);
}

attachFavoritesListener(mealsContainer, () => mealsFromCategory);

loadHeaderFooter();
showSelectedCategoryHeaders();
renderMealCategories();
renderMealsByCategory();
