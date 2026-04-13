export const CategoryNavItem = ({ strCategory, idCategory }, active) => {
  const categoryStyles =
    idCategory === active ? "active-category" : "category-nav-item";

  /* html */
  return `
   <li>
        <a class="${categoryStyles} px-6 py-2 rounded-md font-medium text-sm shrink-0 transition-all duration-300"
          href="/meals/index.html?category=${idCategory}" >
          ${strCategory}
        </a>
    </li>
`;
};

export default CategoryNavItem;
