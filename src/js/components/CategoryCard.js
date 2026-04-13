/**
 * Component that represents a category card with an image, title, and description.
 * @param {Object} category - The category object.
 * @param {string} category.strCategory - The name of the category.
 * @param {string} category.strCategoryThumb - The URL of the category thumbnail image.
 * @param {string} category.strCategoryDescription - A description of the category.
 * @param {string} category.idCategory - The ID of the category.
 * @returns {string} - The HTML string representing the category card.
 */
export const CategoryCard = ({
  strCategory,
  strCategoryThumb,
  strCategoryDescription,
  idCategory,
}) => {
  const shortDesc = strCategoryDescription
    ? strCategoryDescription.slice(0, 120).trimEnd() +
      (strCategoryDescription.length > 120 ? "…" : "")
    : "";

  return /* html */ `
    <a href="/meals/index.html?category=${idCategory}" class="h-80 rounded-4xl bg-surface-container-low ghost-border p-8 flex flex-col justify-end group cursor-pointer hover:bg-surface-container transition-all relative overflow-hidden">
        <img
          src="${strCategoryThumb}"
          alt="${strCategory}"
          class="w-2/5 object-cover rounded-3xl absolute top-6 right-6 transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
        />
        <div class="relative z-10">
          <h3 class="text-2xl font-headline font-bold text-on-surface mb-2">
            ${strCategory}
          </h3>
          <p class="text-sm text-on-surface-variant leading-snug line-clamp-3 transition-opacity duration-300">
            ${shortDesc}
          </p>
        </div>
    </a>
  `;
};
