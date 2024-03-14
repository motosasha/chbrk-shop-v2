import ready from "../../js/utils/documentReady.js";
import HystModal from "../../js/vendor/hystmodal.esm.js";

ready(function () {
  const modals = new HystModal({
    linkAttributeName: "data-hystmodal",
    catchFocus: true,
    closeOnEsc: true,
  });

  window.popupThanks = function () {
    modals.open("#thanks");
  };

  window.popupError = function () {
    modals.open("#error");
  };
});
