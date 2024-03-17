import ready from "../../js/utils/documentReady.js";

ready(function () {
  const numbers = document.querySelectorAll("[data-quantity]");

  if (numbers.length !== 0) {
    numbers.forEach((number) => {
      setupCounter(number);
    });
  }
});

function setupCounter(element) {
  const add = element.querySelector(".number__button--add");
  const sub = element.querySelector(".number__button--sub");
  const input = element.querySelector(".number__input");
  const inputMin = input.getAttribute("min");
  const inputMax = input.getAttribute("max");
  let counter = +input.value;

  const setCounter = (count) => {
    if (count >= inputMin && count <= inputMax) {
      counter = count;
      input.value = counter;
      sub.classList.remove("number__button--disabled");
      add.classList.remove("number__button--disabled");
    }
    if (count <= inputMin) {
      sub.classList.add("number__button--disabled");
    }
    if (count >= inputMax) {
      add.classList.add("number__button--disabled");
    }
  };

  add.addEventListener("click", () => setCounter(counter + 1));
  sub.addEventListener("click", () => setCounter(counter - 1));

  setCounter(counter);
}
