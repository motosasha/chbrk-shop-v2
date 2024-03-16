import ready from "../../js/utils/documentReady.js";
import GLightbox from "glightbox";

ready(function () {
  const accordionHost = document.querySelector(".accordion");

  if (accordionHost) {
    const accordionItems = accordionHost.querySelectorAll(".accordion__item");
    accordionItems.forEach((item) => {
      const accordionHead = item.querySelector(".accordion__head");
      accordionHead.addEventListener("click", (event) => {
        accordionItems.forEach((elem) => {
          elem.classList.remove("accordion__item--active");
        });
        const parentElem = event.target.parentElement;
        parentElem.classList.add("accordion__item--active");
        parentElem.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  GLightbox({
    selector: ".accordion__video",
    plyr: {
      config: {
        ratio: "16:9",
        muted: false,
        hideControls: true,
        youtube: {
          noCookie: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
      },
    },
  });
});
