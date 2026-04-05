export const MealOverview = (
  { strMealThumb, strMeal, strArea, strCategory },
  description,
) =>
  /* html */
  `
    <div class="relative h-100 overflow-hidden">
      <img
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        data-alt="macro close-up of a vibrant red cocktail with a large clear ice cube and orange peel garnish on a dark slate background"
        src=${strMealThumb}
      />
    <div class="absolute top-4 right-4 flex gap-2">
      <span class="bg-surface-container-highest/80 backdrop-blur px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
        <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: &quot;FILL&quot; 1">
            ${strArea}
        </span > 
      </span>
      <span class="bg-surface-container-highest/80 backdrop-blur px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
          <span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: &quot;FILL&quot; 1">
              ${strCategory}
          </span>
      </span>
    </div>
    </div>
    <div class="p-8">
       <h2 class="text-3xl font-headline font-bold mb-4">
            ${strMeal}
       </h2>
       <p class="text-on-surface-variant leading-relaxed font-light">
            ${description}
       </p>
     </div>
  `;

export const MealPreparationItem = ({ step, index }) =>
  /* html */
  `
    <li class="flex gap-6">
      <div class="shrink-0 w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center font-bold ">
        ${index + 1}
      </div> 
      <p class="text-on-surface-variant leading-relaxed">
        ${step}
      </p> 
    </li>
 `;

export const MealMeasureIngredientItem = (measure, ingredient) =>
  /* html */
  `
    <li class="flex justify-between items-center py-2 border-b border-primary/5" >
      <span class="text-on-surface-variant" >${ingredient}</span >
      <span class="font-bold text-primary">${measure}</span>
    </li>
  `;

export const MealDetailsHero = (category) =>
  /* html */
  `
    <div class="absolute inset-0 bg-linear-to-t from-surface to-transparent z-10"></div>
    <img
      class="w-full h-full object-cover grayscale-20 brightness-50"
      data-alt="moody high-end cocktail bar atmosphere with warm amber lighting reflecting on dark polished wood surfaces and crystal glassware"
      src="https://image.pollinations.ai/prompt/${category}%20food%20dark%20background?width=1920&height=800&nologo=true"
      referrerpolicy="no-referrer"
    />
    <div class="absolute bottom-12 left-8 md:left-16 z-20">
      <span class="bg-primary/20 text-primary border border-primary/30 px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-4 inline-block font-labeuppercase">
        Signature Collection
      </span>
      <h1 class="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface">
        ${category}
      </h1>
    </div>
  `;
