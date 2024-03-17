import ready from "../../js/utils/documentReady.js";
import GLightbox from "glightbox";

ready(function () {
  GLightbox({
    selector: "[data-glightbox]",
  });
});
