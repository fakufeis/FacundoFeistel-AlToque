const categoryLinks = document.querySelectorAll("[data-filtro-comida]");
const restaurantCards = document.querySelectorAll(".restaurant-card");
const filterStatus = document.querySelector("#filter-status");
const resetFilterButton = document.querySelector("#reset-filter");

function filterRestaurants(category, categoryName) {
  let visibleCount = 0;

  restaurantCards.forEach((card) => {
    const categories = card.dataset.tipoComida.split(" ");
    const matches = categories.includes(category);

    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  categoryLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.filtroComida === category);
  });

  filterStatus.textContent = visibleCount
    ? `${visibleCount} ${visibleCount === 1 ? "restaurante disponible" : "restaurantes disponibles"} para ${categoryName}.`
    : `Todavía no hay restaurantes disponibles para ${categoryName}.`;
  resetFilterButton.hidden = false;
}

categoryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const categoryName = link.querySelector("span").textContent;
    filterRestaurants(link.dataset.filtroComida, categoryName);
  });
});

resetFilterButton.addEventListener("click", () => {
  restaurantCards.forEach((card) => {
    card.hidden = false;
  });

  categoryLinks.forEach((link) => {
    link.classList.remove("is-active");
  });

  filterStatus.textContent = "Mostrando todos los restaurantes.";
  resetFilterButton.hidden = true;
});
