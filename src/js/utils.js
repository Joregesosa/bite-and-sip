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
 * Fetches JSON data from a specified URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} A promise that resolves to the fetched JSON data.
 */
export async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
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
 * Loads the header and footer templates and renders them into the respective elements in the DOM. The header template is loaded from "/partials/header.html" and rendered into the element with the ID "main-header". The footer template is loaded from "/partials/footer.html" and rendered into the element with the ID "main-footer".
 * @returns {Promise<void>} A promise that resolves when both the header and footer have been loaded and rendered.
 */
export async function loadHeaderFooter() {
  const headertTemplate = await loadTemplate("/partials/header.html");
  //const footerTemplate = await loadTemplate("/partials/footer.html");

  const bodyElement = qs("body");
  //const footerElement = qs("#main-footer");
  renderWithTemplate(headertTemplate, bodyElement);
  //renderWithTemplate(footerTemplate, footerElement);
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
