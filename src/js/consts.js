/**
 * Constants for the application, including API URLs, keys, and prompt templates.
 */
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL;

/**
 *  Generates a prompt for the Gemini API based on the meal's name, ingredients, and region.
 * @param {string} mealName - The name of the meal.
 * @param {string} ingredients - A comma-separated list of the meal's ingredients.
 * @param {string} region - The region or cuisine type of the meal.
 * @param {number} maxCharacters - The maximum number of characters for the generated description.
 * @param {string} type - The type of content to generate (e.g., "description").
 * @returns {string} - The formatted prompt to be sent to the Gemini API.
 */
export const PROMPT = (
  mealName,
  ingredients,
  region,
  maxCharacters = 150,
  type = "description",
) =>
  `Generate an appetizing, brief (${maxCharacters} characters maximum), and simple ${type} of the following dish:
    Name: ${mealName}
    Ingredients: ${ingredients}.
    Region: ${region}.
    Reply with the ${type} only, without introductions and any decorative emojies.`;

export const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
