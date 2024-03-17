import ready from "../../js/utils/documentReady.js";
import JustValidate from "just-validate";
import { dict } from "../../js/common/dict.js";
import { faqFormUrl } from "../../js/common/urls.js";

ready(function () {
  const faqForm = document.querySelector(".faq-form");

  if (faqForm) {
    const faqFormValidate = new JustValidate(
      ".faq-form",
      {
        tooltip: {
          position: "bottom",
        },
        errorFieldCssClass: ["invalid"],
        errorLabelCssClass: "form__error",
      },
      dict,
    );
    faqFormValidate.setCurrentLocale("ru");
    faqFormValidate
      .addField("#faqName", [
        {
          rule: "required",
          errorMessage: "Name is required",
        },
        {
          rule: "minLength",
          value: 2,
          errorMessage: "Name is too short",
        },
        {
          rule: "maxLength",
          value: 50,
          errorMessage: "Name is too long",
        },
      ])
      .addField("#faqEmail", [
        {
          rule: "required",
          errorMessage: "Email is required",
        },
        {
          rule: "email",
          errorMessage: "Email is invalid",
        },
      ])
      .addField("#faqMessage", [
        {
          rule: "required",
          errorMessage: "Message is required",
        },
      ])
      .onSuccess(() => {
        const faqFormInputs = faqForm.querySelectorAll("input");
        const faqFormTextarea = faqForm.querySelector("textarea");
        const faqFormButton = faqForm.querySelector("button");
        const faqFormFields = Array.from(faqFormInputs);
        faqFormFields.push(faqFormTextarea);

        faqFormButton.setAttribute("disabled", "true");
        let formData = new FormData(faqForm);
        faqFormFields.forEach((item) => {
          formData.append(item.id, item.value);
        });
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(faqFormUrl, {
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
            faqFormButton.removeAttribute("disabled");
          } else {
            window.popupError();
          }
        });
      });
  }
});
