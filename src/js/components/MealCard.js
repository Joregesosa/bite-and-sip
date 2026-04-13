import { getMealDificulty } from "../utils";

/**
 * @description Component that generates an HTML string for a meal card, displaying the meal's name, thumbnail image, a short description, and preparation time.
 * @param {Object} meal - The meal object containing details about the meal.
 * @param {string} meal.strMeal - The name of the meal.
 * @param {string} meal.idMeal - The unique identifier for the meal.
 * @param {string} meal.strMealThumb - The URL of the meal's thumbnail image.
 * @returns {string} - The HTML string representing the meal card.
 */
export const MealCard = ({ strMeal, idMeal, strMealThumb }) => /* html */ `
    <div class="group relative">
        <div class="relative aspect-3/4 rounded-4xl overflow-hidden mb-6 ghost-border">
            <img
                alt="${strMeal}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Minimalist top-down shot of a colorful healthy grain bowl with salmon, avocado, and vibrant microgreens on a slate plate"
                src="${strMealThumb}"
            /> 
        </div>
        <h4 class="text-2xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
            ${strMeal}
        </h4> 
        <a href="/meals/meal-details.html?meal=${idMeal}" class="absolute inset-0"></a>
    </div>
  `;

/**
 * @description Component that generates an HTML string for a detailed meal card, displaying the meal's name, thumbnail image, preparation time, and difficulty level.
 * @param {Object} meal - The meal object containing details about the meal.
 * @param {string} meal.strMeal - The name of the meal.
 * @param {string} meal.idMeal - The unique identifier for the meal.
 * @param {string} meal.strMealThumb - The URL of the meal's thumbnail image.
 * @returns {string} - The HTML string representing the detailed meal card.
 */
export const MealCardDetailed = ({ strMeal, idMeal, strMealThumb }) => {
  const mealDifficulty = getMealDificulty();
  return /* html */ `
     <article class="group bg-surface-container-high rounded-xl overflow-hidden ghost-border flex flex-col transition-all duration-300 hover:-translate-y-1 relative">
            <div class="relative h-64 overflow-hidden">
              <img
                alt="${strMeal}"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                data-alt="Close-up of truffle mushroom risotto served in a rustic ceramic bowl with fresh herbs and shaved parmesan on a dark background"
                src="${strMealThumb}"
              />
              <button
                class="absolute top-4 right-4 bg-surface/60 backdrop-blur-md p-2 rounded-full text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
              >
                <span class="material-symbols-outlined" data-icon="favorite"
                  >favorite</span
                >
              </button>
              <div class="absolute bottom-4 left-4">
                <span
                  class="bg-primary-container/90 backdrop-blur-sm text-on-primary-container text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  >Classic</span
                >
              </div>
            </div>
            <div class="p-8 flex flex-col grow">
              <h3
                class="font-headline text-2xl font-bold mb-4 text-on-surface group-hover:text-primary transition-colors"
              >
                ${strMeal}
              </h3>
              <div
                class="mt-auto flex items-center justify-between text-xs font-medium text-on-surface-variant tracking-wider uppercase"
              >
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-sm"
                    >schedule</span
                  >
                  <span>${mealDifficulty.time} MIN</span>
                </div>
                <div class="flex flex-col gap-1 w-24">
                  <div class="flex justify-between text-[8px] mb-1">
                    <span>DIFFICULTY</span>
                    <span>${mealDifficulty.dificulty}</span>
                  </div>
                  <div
                    class="h-1 w-full spirit-gauge-bg rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full bg-linear-to-r from-tertiary-container to-tertiary" style="width: ${mealDifficulty.barWidth}"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <a href="/meals/meal-details.html?meal=${idMeal}" class="absolute inset-0"></a>
    </article>
    `;
};

export default MealCard;
