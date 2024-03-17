import ready from "../../js/utils/documentReady.js";

ready(function () {
  const inventoryCards = document.querySelectorAll(".inventory-tile");

  if (inventoryCards.length !== 0) {
    const selectAllButton = document.querySelector("#inventoryAll");
    const deselectButton = document.querySelector("#inventoryNone");

    selectAllButton.addEventListener("click", () => {
      inventoryCards.forEach((card) => {
        const cardCheckbox = card.querySelector("[type='checkbox']");
        cardCheckbox.checked = true;
      });
    });

    deselectButton.addEventListener("click", () => {
      inventoryCards.forEach((card) => {
        const cardCheckbox = card.querySelector("[type='checkbox']");
        cardCheckbox.checked = false;
      });
    });
  }
});
