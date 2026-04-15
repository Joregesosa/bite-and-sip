import ContactForm from "./modules/ContactForm.mjs";

/**
 * Shorthand for `document.querySelector()`. If a parent element is provided, it will search within that element instead of the entire document.
 * @param {string} selector - The CSS selector to match.
 * @param {Element} [parent=document] - The parent element to search within (optional).
 * @returns {Element|null} The first element that matches the selector, or null if no matches are found.
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Retrieves data from local storage.
 * @param {string} key - The key for the data to retrieve.
 * @returns {*} The parsed data from local storage, or null if not found.
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Saves data to local storage.
 * @param {string} key - The key for the data to save.
 * @param {*} data - The data to save.
 */
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Retrieves data from session storage.
 * @param {string} key - The key for the data to retrieve.
 * @returns {*} The parsed data from session storage, or null if not found.
 */
export function getSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

/**
 * Saves data to session storage.
 * @param {string} key - The key for the data to save.
 * @param {*} data - The data to save.
 */
export function setSessionStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

/**
 * Shuffles the elements of an array in place.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Retrieves the value of a specified query parameter from the URL.
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {string|null} The value of the query parameter, or null if not found.
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

/** Renders HTML content using a template and inserts it into a specified parent element. Optionally, a callback function can be executed after rendering.
 * @param {string} template - The HTML template to render.
 * @param {Element} parentElement - The parent element where the rendered HTML will be inserted.
 * @param {*} data - The data to be passed to the callback function (optional).
 * @param {string} [position="afterbegin"] - The position where the HTML will be inserted relative to the parent element (optional, default is "afterbegin").
 * @param {Function} [callback=() => {}] - A callback function to execute after rendering (optional).
 */
export function renderWithTemplate(
  template,
  parentElement,
  data,
  position = "afterbegin",
  callback = () => {},
) {
  const html = template;
  parentElement.insertAdjacentHTML(position, html);
  callback(data);
}

/** Loads an HTML template from a specified path and returns it as a string.
 * @param {string} path - The path to the HTML template to load.
 * @returns {Promise<string>} A promise that resolves to the loaded HTML template as a string.
 */
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

/**
 * Highlights the nav link whose href matches the current page path.
 * Compares each `.nav-link`'s pathname against `window.location.pathname`.
 */
export function setActiveNavLink() {
  const path = window.location.pathname;
  const activeLink = qs(`.active-link`);
  if (activeLink) activeLink.classList.remove("active-link");
  const navLink = qs(`.nav-link[href="${path}"]`);
  if (navLink) navLink.classList.add("active-link");
}

/**
 * Loads the header and footer templates and renders them into the DOM.
 * Also initialises header interactions: active nav link, mobile menu, and surprise button.
 * @returns {Promise<void>}
 */
export async function loadHeaderFooter() {
  const headertTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const bodyElement = qs("body");
  renderWithTemplate(headertTemplate, bodyElement);
  renderWithTemplate(
    footerTemplate,
    bodyElement,
    null,
    "beforeend",
    ContactForm.init,
  );

  setActiveNavLink();

  // Mobile menu toggle
  const toggle = document.getElementById("nav-mobile-toggle");
  const menu = document.getElementById("nav-mobile-menu");
  const icon = document.getElementById("nav-mobile-icon");

  toggle?.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    icon.textContent = isOpen ? "menu" : "close";
  });

  // Surprise me — fetch a random meal and navigate to its detail page
  document
    .getElementById("nav-surprise-btn")
    ?.addEventListener("click", async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php",
        );
        const data = await res.json();
        const id = data?.meals?.[0]?.idMeal;
        if (id) window.location.href = `/meals/meal-details.html?meal=${id}`;
      } catch {
        window.location.href = "/meals/index.html";
      }
    });
}
/**
 * Generates a random meal difficulty level based on a randomly generated preparation time. The preparation time is a random number between 15 and 120 minutes. The difficulty level is determined as follows: "Easy" for preparation times of 30 minutes or less, "Medium" for preparation times greater than 30 minutes and up to 60 minutes, and "Hard" for preparation times greater than 60 minutes.
 * @returns  {Object} An object containing the randomly generated preparation time and the corresponding difficulty level.
 */
export function getMealDificulty() {
  // generate a random number between 15 and 120
  const randomTime = Math.floor(Math.random() * (120 - 15 + 1)) + 15;
  let dificulty = "";
  if (randomTime <= 30) dificulty = "Easy";
  if (randomTime > 30 && randomTime <= 60) dificulty = "Medium";
  if (randomTime > 60) dificulty = "Hard";

  return {
    time: randomTime,
    dificulty,
    barWidth: `${(randomTime / 120) * 100}%`,
  };
}
/**
 * @description Handles the addition and removal of meals from the favorites list. It checks if a meal is already in the favorites list stored in local storage. If it is, it removes it; if it isn't, it adds it. The function also toggles the "favorite" class on the provided element to reflect the change in the UI.
 * @param {*} mealId
 * @param {*} element
 * @param {*} meals
 */
export function favoritesHandler(mealId, element, meals) {
  let favorites = getLocalStorage("favorites") || [];
  if (favorites.some((meal) => meal.idMeal === mealId)) {
    favorites = favorites.filter((meal) => meal.idMeal !== mealId);
  } else {
    const mealToAdd = meals.find((meal) => meal.idMeal === mealId);
    if (mealToAdd) {
      favorites.push(mealToAdd);
    }
  }
  setLocalStorage("favorites", favorites);
  element.classList.toggle("favorite");
}

/**
 * Checks if a meal is in the favorites list.
 * @param {string} mealId - The ID of the meal to check.
 * @returns {boolean} - True if the meal is favorited, false otherwise.
 */
export function isMealFavorite(mealId) {
  const favorites = getLocalStorage("favorites") || [];
  return favorites.some((meal) => meal.idMeal === mealId);
}

/**
 * Attaches a click event listener to a specified container element that listens for clicks on elements with the class "heart-btn". When a click is detected on a "heart-btn" element, it retrieves the meal ID from the button's value, calls the `favoritesHandler` function to add or remove the meal from the favorites list, and then executes an optional callback function.
 * @param {Element} container - The container element to which the click event listener will be attached.
 * @param {Function} getMeals - A function that returns the current list of meals, used to find the meal details when adding to favorites.
 * @param {Function} cb - An optional callback function to be executed after handling the favorite action.
 */
export function attachFavoritesListener(container, getMeals, cb = () => {}) {
  container.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(".heart-btn");
    if (favoriteButton) {
      const mealId = favoriteButton.value;
      favoritesHandler(mealId, favoriteButton, getMeals());
    }
    cb();
  });
}
