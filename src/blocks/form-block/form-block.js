import ready from "../../js/utils/documentReady.js";
import JustValidate from "just-validate";
import { dict } from "../../js/common/dict.js";
import {
  loginFormUrl,
  registrationFormUrl,
  restoreFormUrl,
  resetFormUrl,
  validationConfig,
} from "../../js/common/urls.js";

ready(function () {
  const loginForm = document.querySelector("#login-form");
  const registrationForm = document.querySelector("#registration-form");
  const restoreForm = document.querySelector("#restore-form");
  const resetForm = document.querySelector("#reset-form");

  if (loginForm) {
    const loginFormValidate = new JustValidate("#login-form", validationConfig, dict);
    loginFormValidate.setCurrentLocale("ru");
    loginFormValidate
      .addField("#loginEmail", [
        {
          rule: "required",
          errorMessage: "Email is required",
        },
        {
          rule: "email",
          errorMessage: "Email is invalid",
        },
      ])
      .addField("#loginPass", [
        {
          rule: "required",
          errorMessage: "Password is required",
        },
        {
          rule: "minLength",
          value: 4,
          errorMessage: "Password is too short",
        },
      ])
      .addField("#loginCheck", [
        {
          rule: "required",
          errorMessage: "The field is required",
        },
      ])
      .onSuccess(() => {
        const loginFormInputs = loginForm.querySelectorAll("input");
        const loginFormFields = Array.from(loginFormInputs);
        let formData = new FormData(loginForm);
        loginFormFields.forEach((item) => {
          formData.append(item.id, item.value);
        });
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(loginFormUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(plainFormData),
        }).then((response) => {
          if (response.ok) {
            alert("Successful login");
          } else {
            window.popupLoginError();
          }
        });
      });
  }

  if (registrationForm) {
    const registrationFormValidate = new JustValidate("#registration-form", validationConfig, dict);
    registrationFormValidate.setCurrentLocale("ru");
    registrationFormValidate
      .addField("#registrationName", [
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
      .addField("#registrationEmail", [
        {
          rule: "required",
          errorMessage: "Email is required",
        },
        {
          rule: "email",
          errorMessage: "Email is invalid",
        },
      ])
      .addField("#registrationPass", [
        {
          rule: "required",
          errorMessage: "Password is required",
        },
        {
          rule: "minLength",
          value: 4,
          errorMessage: "Password is too short",
        },
      ])
      .addField("#registrationPassRepeat", [
        {
          rule: "required",
          errorMessage: "Password is required",
        },
        {
          rule: "minLength",
          value: 4,
          errorMessage: "Password is too short",
        },
        {
          validator: (value) => {
            const passFieldValue = registrationForm.querySelector("#registrationPass").value;
            return value === passFieldValue;
          },
          errorMessage: "Passwords must match",
        },
      ])
      .addField("#registrationCheck", [
        {
          rule: "required",
          errorMessage: "The field is required",
        },
      ])
      .onSuccess(() => {
        const registrationInputs = registrationForm.querySelectorAll("input");
        const registrationFields = Array.from(registrationInputs);
        let formData = new FormData(registrationForm);
        registrationFields.forEach((item) => {
          formData.append(item.id, item.value);
        });
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(registrationFormUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(plainFormData),
        }).then((response) => {
          if (response.ok) {
            window.popupRegistrationSuccess();
            registrationForm.reset();
          } else {
            window.popupError();
          }
        });
      });
  }

  if (restoreForm) {
    const restoreFormValidate = new JustValidate("#restore-form", validationConfig, dict);
    restoreFormValidate.setCurrentLocale("ru");
    restoreFormValidate
      .addField("#restoreEmail", [
        {
          rule: "required",
          errorMessage: "Email is required",
        },
        {
          rule: "email",
          errorMessage: "Email is invalid",
        },
      ])
      .onSuccess(() => {
        const restoreFormInputs = restoreForm.querySelectorAll("input");
        const restoreFormFields = Array.from(restoreFormInputs);
        let formData = new FormData(restoreForm);
        restoreFormFields.forEach((item) => {
          formData.append(item.id, item.value);
        });
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(restoreFormUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(plainFormData),
        }).then((response) => {
          if (response.ok) {
            window.popupRestoreSuccess();
          } else {
            window.popupRestoreError();
          }
        });
      });
  }

  if (resetForm) {
    const resetFormValidate = new JustValidate("#reset-form", validationConfig, dict);
    resetFormValidate.setCurrentLocale("ru");
    resetFormValidate
      .addField("#resetPass", [
        {
          rule: "required",
          errorMessage: "Password is required",
        },
        {
          rule: "minLength",
          value: 4,
          errorMessage: "Password is too short",
        },
      ])
      .addField("#resetPassRepeat", [
        {
          rule: "required",
          errorMessage: "Password is required",
        },
        {
          rule: "minLength",
          value: 4,
          errorMessage: "Password is too short",
        },
        {
          validator: (value) => {
            const passFieldValue = resetForm.querySelector("#resetPass").value;
            return value === passFieldValue;
          },
          errorMessage: "Passwords must match",
        },
      ])
      .onSuccess(() => {
        const resetInputs = resetForm.querySelectorAll("input");
        const resetFields = Array.from(resetInputs);
        let formData = new FormData(resetForm);
        resetFields.forEach((item) => {
          formData.append(item.id, item.value);
        });
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(resetFormUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(plainFormData),
        }).then((response) => {
          if (response.ok) {
            window.popupResetSuccess();
            resetForm.reset();
          } else {
            window.popupError();
          }
        });
      });
  }
});
