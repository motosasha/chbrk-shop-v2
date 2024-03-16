import ready from "../../js/utils/documentReady.js";

ready(function () {
  const passFields = document.querySelectorAll(".form__row");

  passFields.forEach((field) => {
    const passInput = field.querySelector("input[type='password']");
    const passToggle = field.querySelector(".form__eye");

    if (passToggle) {
      passToggle.addEventListener("click", function () {
        if (passInput.type === "password") {
          passInput.setAttribute("type", "text");
          passToggle.classList.add("form__eye--show-pass");
        } else {
          passToggle.classList.remove("form__eye--show-pass");
          passInput.setAttribute("type", "password");
        }
      });
    }
  });
});
