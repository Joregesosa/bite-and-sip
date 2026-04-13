import BaseRequest from "./BaseRequest.mjs";
import { BASE_URL } from "../consts.js";

export default class MealsRequest extends BaseRequest {
  constructor(url = BASE_URL, method = "GET", headers = {}, body = null) {
    super(url, method, headers, body);
  }

  /**
   * Extracts values from the meal data object based on a specified key prefix. This is used to retrieve ingredients or other related information from the meal data.
   * @param {Object} mealData - The meal data object containing the meals array.
   * @param {string} keyInitial - The prefix of the keys to extract values from (e.g., "strIngredient").
   * @returns {Array} - An array of values extracted from the meal data.
   */
  extractValuesByPrefix(mealData, keyInitial) {
    return Object.entries(mealData.meals[0])
      .filter(([key]) => key.startsWith(keyInitial) && mealData.meals[0][key])
      .map(([_, value]) => value);
  }

  /**
   * Fetches the meal categories from the API.
   * @returns {Promise<Object>} - The response data containing meal categories.
   */
  async getMealsCategories() {
    this.url = `${BASE_URL}/categories.php`;
    return await this.send();
  }

  /**
   * Fetches meals by category from the API.
   * @param {string} category - The category of meals to fetch.
   * @returns {Promise<Object>} - The response data containing the meals.
   */
  async getMealsByCategory(category) {
    this.url = `${BASE_URL}/filter.php?c=${category}`;
    return await this.send();
  }

  /**
   * Fetches a random meal from the API.
   * @returns {Promise<Object>} - The response data containing the random meal.
   */
  async getRandomMeal() {
    this.url = `${BASE_URL}/random.php`;
    return await this.send();
  }

  /**
   * Fetches a meal by its ID from the API.
   * @param {string} id - The ID of the meal to fetch.
   * @returns {Promise<Object>} - The response data containing the meal.
   */
  async getMealById(id) {
    this.url = `${BASE_URL}/lookup.php?i=${id}`;
    return await this.send();
  }
}
