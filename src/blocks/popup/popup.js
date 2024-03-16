import ready from "../../js/utils/documentReady.js";
import HystModal from "../../js/vendor/hystmodal.esm.js";

ready(function () {
  const modals = new HystModal({
    linkAttributeName: "data-hystmodal",
    catchFocus: true,
    closeOnEsc: true,
  });
  const popupIds = {
    popupThanks: "#thanks",
    popupError: "#error",
    popupLoginError: "#login-error",
    popupRegistrationSuccess: "#registration-success",
    popupRestoreSuccess: "#restore-success",
    popupRestoreError: "#restore-error",
    popupResetSuccess: "#reset-success",
  };
  for (let popup in popupIds) {
    window[popup] = function () {
      modals.open(popupIds[popup]);
    };
  }
});
