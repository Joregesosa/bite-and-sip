import BaseRequest from "./BaseRequest.mjs";
import { GEMINI_API_URL, API_KEY, PROMPT } from "../consts.js";

/**
 * Class representing a request to the Gemini API to generate content based on a meal's name, ingredients, and region. It extends the BaseRequest class and constructs the appropriate request body and headers for the Gemini API. The getResponse method sends the request and retrieves the generated content from the response.
 * @extends BaseRequest
 * @constructor
 * @param {Object} options - The options for the Gemini request.
 * @param {string} options.mealName - The name of the meal.
 * @param {string} options.ingredients - A comma-separated list of the meal's ingredients.
 * @param {string} options.area - The region or cuisine type of the meal.
 * @param {string} [options.type="description"] - The type of content to generate (e.g., "description").
 * @param {number} [options.maxCharacters=150] - The maximum number of characters for the generated content.
 * @param {string|null} [options.rawPrompt=null] - An optional raw prompt to use instead of generating one from the meal information.
 */
export default class GeminiRequest extends BaseRequest {
  constructor({
    mealName,
    ingredients,
    area,
    type = "description",
    maxCharacters = 150,
    rawPrompt = null,
  }) {
    const promptText =
      rawPrompt ?? PROMPT(mealName, ingredients, area, maxCharacters, type);
    const body = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: { maxOutputTokens: 2000, temperature: 0.3 },
    };
    super(
      GEMINI_API_URL,
      "POST",
      {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body,
    );
    this._cacheKey = mealName ? `gemini_${mealName}_${type}` : "gemini_fact";
  }

  /**
   * Fetches the description of the meal from the Gemini API.
   * Results are cached in sessionStorage by meal name and request type.
   * @returns {Promise<string>} - The description of the meal.
   */
  async getResponse() {
    const cached = sessionStorage.getItem(this._cacheKey);
    if (cached) return cached;

    const result = await this.send();
    const text = result.candidates[0].content.parts[0].text;
    sessionStorage.setItem(this._cacheKey, text);
    return text;
  }
}
