import ready from "../../js/utils/documentReady.js";
import IMask from "imask";
import { TINKOFF_PERCENT } from "../../js/common/payment.js";
import JustValidate from "just-validate";
import { dict } from "../../js/common/dict.js";
import { paymentUrl, codeUrl, validationConfig } from "../../js/common/urls.js";

ready(function () {
  const payment = document.querySelector(".payment-block");

  if (payment) {
    const payForm = payment.querySelector("#pay-form");
    const codeForm = payment.querySelector("#code-form");
    const sumField = payment.querySelector("#paySum");
    const totalField = payment.querySelector("#payTotal");
    const popularSums = payment.querySelectorAll(".payment-block__button");
    const percentAmount = TINKOFF_PERCENT;

    const maskOptions = {
      mask: Number,
      min: 50,
      max: 1000000,
      scale: 2,
      thousandsSeparator: "",
      padFractionalZeros: true,
    };

    const sumMask = IMask(sumField, maskOptions);
    const totalMask = IMask(totalField, maskOptions);

    totalCalc(sumField, totalField, percentAmount);
    sumMask.updateValue();
    totalMask.updateValue();

    for (const popularSum of popularSums) {
      const popularSumAmount = popularSum.dataset.amount;

      popularSum.addEventListener("click", () => {
        sumField.value = popularSumAmount;
        totalCalc(sumField, totalField, percentAmount);
        sumMask.updateValue();
        totalMask.updateValue();
      });
    }

    sumField.addEventListener("input", () => {
      totalCalc(sumField, totalField, percentAmount);
      sumMask.updateValue();
      totalMask.updateValue();
    });

    sumField.addEventListener("focusout", () => {
      if (!isNaN(parseFloat(sumField.value))) {
        totalCalc(sumField, totalField, percentAmount);
      } else {
        sumField.value = "50,00";
        totalCalc(sumField, totalField, percentAmount);
      }
      sumMask.updateValue();
      totalMask.updateValue();
    });

    const payFormValidate = new JustValidate("#pay-form", validationConfig, dict);
    payFormValidate.setCurrentLocale("ru");
    payFormValidate
      .addField("#paySum", [
        {
          rule: "required",
          errorMessage: "The field is required",
        },
      ])
      .addField("#payCheck", [
        {
          rule: "required",
          errorMessage: "The field is required",
        },
      ])
      .onSuccess(() => {
        let formData = new FormData(payForm);
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(paymentUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(plainFormData),
        }).then((response) => {
          if (response.ok) {
            alert("Success");
          } else {
            window.popupError();
          }
        });
      });

    const codeFormValidate = new JustValidate("#code-form", validationConfig, dict);
    codeFormValidate.setCurrentLocale("ru");
    codeFormValidate
      .addField("#codeField", [
        {
          rule: "required",
          errorMessage: "The field is required",
        },
      ])
      .onSuccess(() => {
        let formData = new FormData(codeForm);
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(codeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(plainFormData),
        }).then((response) => {
          if (response.ok) {
            alert("Success");
          } else {
            window.popupError();
          }
        });
      });
  }
});

function totalCalc(sum, total, percent) {
  const sumFieldValue = sum.value.replace(",", ".");
  if (sumFieldValue === ".") {
    total.value = "0,00";
  } else {
    total.value = (+sumFieldValue * (1 + +percent)).toFixed(2).replace(".", ",");
  }
}
