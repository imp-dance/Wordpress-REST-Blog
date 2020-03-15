import React from "react";
import { Link } from "react-router-dom";
export default ({ categories, sortedArticles, isOnly, sortArticles }) => {
  let categoryItems = [];
  categories.forEach((category, index) => {
    if (category.id !== 1) {
      categoryItems.push(
        <li key={"art" + 1888 + index} data-id={category.id}>
          <button
            onClick={sortArticles}
            data-categoryid={category.id}
            className={
              sortedArticles === null ||
              parseInt(sortedArticles) === parseInt(category.id)
                ? "white"
                : "gray"
            }
          >
            {category.name}
          </button>
        </li>
      );
    }
  });
  if (isOnly) {
    categoryItems.push(
      <li key={"fart" + 1923}>
        <Link to="/articles">
          <button>&#8249; Articles</button>
        </Link>
      </li>
    );
  }
  return categoryItems;
};
