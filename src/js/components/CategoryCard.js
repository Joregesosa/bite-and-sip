/**
 * Component that represents a category card with an image and a title.
 * @param {Object} category - The category object containing the category name and thumbnail.
 * @param {string} category.strCategory - The name of the category.
 * @param {string} category.strCategoryThumb - The URL of the category thumbnail image.
 * @returns {string} - The HTML string representing the category card.
 */
export const CategoryCard = ({ strCategory, strCategoryThumb }) => /* html */ `
    <div class="h-80 rounded-4xl bg-surface-container-low ghost-border p-8 flex flex-col justify-end group cursor-pointer hover:bg-surface-container transition-all relative">
        <img
          src="${strCategoryThumb}"
          alt="${strCategory}"
          class="w-4/5 object-cover rounded-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <h3 class="text-2xl font-headline font-bold text-on-surface mb-2">
          ${strCategory}
        </h3> 
    </div>
  `;
