import ready from "../../js/utils/documentReady.js";

ready(function () {
  const userHost = document.querySelector(".user");

  if (userHost) {
    const userTrigger = userHost.querySelector(".user__button");
    const userDrop = userHost.querySelector(".user__drop");

    userTrigger.addEventListener("click", () => {
      let userHostState = userHost.getAttribute("data-state");
      userHostState === "open" ? (userHost.dataset.state = "") : (userHost.dataset.state = "open");
    });

    document.body.addEventListener("click", (e) => {
      if (!userTrigger.contains(e.target) && !userDrop.contains(e.target))
        userHost.dataset.state = "";
    });
  }
});
