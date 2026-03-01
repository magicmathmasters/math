// script.js
(function () {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const hrefFile = href.split("/").pop().split("#")[0].split("?")[0];

    if (hrefFile === file) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  const languageSelect = document.getElementById("language-select");

  if (languageSelect) {
    const path = window.location.pathname.toLowerCase();

    if (path.indexOf("/vi/") === 0) {
      languageSelect.value = "/vi/index.html";
    } else if (path.indexOf("/zh/") === 0) {
      languageSelect.value = "/zh/index.html";
    } else if (path.indexOf("/hi/") === 0) {
      languageSelect.value = "/hi/index.html";
    } else if (path.indexOf("/es/") === 0) {
      languageSelect.value = "/es/index.html";
    } else {
      languageSelect.value = "/index.html";
    }

    languageSelect.addEventListener("change", function () {
      if (this.value) {
        window.location.href = this.value;
      }
    });
  }
})();