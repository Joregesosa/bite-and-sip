/**
 * Component that generates an HTML string for a meal card, displaying the meal's name, thumbnail image, a short description, and preparation time.
 * @param {Object} meal - The meal object containing details about the meal.
 * @param {string} meal.strMeal - The name of the meal.
 * @param {string} meal.idMeal - The unique identifier for the meal.
 * @param {string} meal.strMealThumb - The URL of the meal's thumbnail image.
 * @returns {string} - The HTML string representing the meal card.
 */
export const MealCard = ({ strMeal, idMeal, strMealThumb }) => /* html */ `
    <div class="group">
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
    </div>
  `;

export default MealCard;
