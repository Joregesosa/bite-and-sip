import { getMealDificulty } from "../utils";

/**
 * @description Component that generates an HTML string for a detailed meal card, displaying the meal's name, thumbnail image, preparation time, and difficulty level.
 * @param {Object} meal - The meal object containing details about the meal.
 * @param {string} meal.strMeal - The name of the meal.
 * @param {string} meal.idMeal - The unique identifier for the meal.
 * @param {string} meal.strMealThumb - The URL of the meal's thumbnail image.
 * @returns {string} - The HTML string representing the detailed meal card.
 */
export const MealCard = ({ strMeal, idMeal, strMealThumb }, isFavorite = false) => {
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
              <button class="heart-btn z-10 absolute top-4 right-4 bg-surface/60 backdrop-blur-md p-2 rounded-full text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-pointer${isFavorite ? " favorite" : ""}" value="${idMeal}">
                <span class="material-symbols-outlined heart-icon" data-icon="favorite">
                  favorite
                </span>
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
