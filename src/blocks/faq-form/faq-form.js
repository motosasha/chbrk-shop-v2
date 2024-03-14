import ready from "../../js/utils/documentReady.js";

ready(function () {
  const faqForm = document.querySelector(".faq-form");

  if (faqForm) {
    const faqFormInputs = faqForm.querySelectorAll("input");
    const faqFormTextarea = faqForm.querySelector("textarea");
    const faqFormButton = faqForm.querySelector("button");

    const faqFormFields = Array.from(faqFormInputs);
    faqFormFields.push(faqFormTextarea);

    faqFormFields.forEach((input) => {
      input.addEventListener("input", () => {
        defaultFormCheck(faqForm, faqFormButton);
      });
    });

    faqForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(faqForm);
      faqFormFields.forEach((item) => {
        formData.append(item.id, item.value);
      });
      const plainFormData = Object.fromEntries(formData.entries());
      // todo поменять адрес запроса на реальный
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(plainFormData),
      }).then((response) => {
        if (response.ok) {
          window.popupThanks();
          faqForm.reset();
          faqFormFields.forEach((item) => {
            item.classList.remove("input--has-value");
          });
          faqFormTextarea.classList.remove("textarea--has-value");
          faqFormButton.setAttribute("disabled", "true");
        } else {
          window.popupError();
        }
      });
    });
  }
});

function defaultFormCheck(form, submit) {
  const formNameValue = form.querySelector("input[type='text']").value;
  const formEmailValue = form.querySelector("input[type='email']").value;
  const formTextareaValue = form.querySelector("textarea").value;
  const noEmptyValues = !!formNameValue && !!formEmailValue && !!formTextareaValue;
  const eMailFormat = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formEmailValue);

  noEmptyValues && eMailFormat
    ? submit.removeAttribute("disabled")
    : submit.setAttribute("disabled", "true");
}
