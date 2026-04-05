import BaseRequest from "./BaseRequest.mjs";
import { GEMINI_API_URL, API_KEY, PROMPT } from "../consts.js";

export default class GeminiRequest extends BaseRequest {
  constructor({
    mealName,
    ingredients,
    area,
    type = "description",
    maxCharacters = 150,
  }) {
    const body = {
      contents: [
        {
          parts: [
            { text: PROMPT(mealName, ingredients, area, maxCharacters, type) },
          ],
        },
      ],
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
  }

  /**
   * Fetches the description of the meal from the Gemini API.
   * @returns {Promise<string>} - The description of the meal.
   */
  async getResponse() {
    const result = await this.send();
    return result.candidates[0].content.parts[0].text;
  }
}
