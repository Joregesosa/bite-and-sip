import "../style.css";
import { MealCard } from "./components/MealCard.js";
import {
  loadHeaderFooter,
  getLocalStorage,
  qs,
  attachFavoritesListener,
} from "./utils.js";
const mealsContainer = qs("#meal-list");

/**
 * Loads the favorite meals from local storage and renders them on the page. It also attaches an event listener to handle adding or removing meals from favorites when the heart button is clicked.
 */
function loadFavoritesMeals() {
  const meals = getLocalStorage("favorites") || [];
  mealsContainer.innerHTML = meals.map((meal) => MealCard(meal, true)).join("");
}

attachFavoritesListener(
  mealsContainer,
  () => {
    const meals = getLocalStorage("favorites") || [];
    return meals;
  },
  loadFavoritesMeals,
);

loadHeaderFooter();
loadFavoritesMeals();
