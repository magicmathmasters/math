// script.js
(function () {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const hrefFile = href.split("/").pop().split("#")[0].split("?")[0];

    if (hrefFile === file) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  const langBtn = document.getElementById("langBtn");
  const langDropdown = document.getElementById("langDropdown");
  const currentLangFlag = document.getElementById("currentLangFlag");
  const currentLangText = document.getElementById("currentLangText");
  const langOptions = document.querySelectorAll(".lang-option");

  if (langBtn && langDropdown && currentLangFlag && currentLangText && langOptions.length) {
    const path = window.location.pathname.toLowerCase();
    const fileName = (path.split("/").pop() || "index.html").toLowerCase();

    let currentCode = "en";

    if (path.indexOf("/vi/") !== -1) currentCode = "vi";
    else if (path.indexOf("/zh/") !== -1) currentCode = "zh";
    else if (path.indexOf("/hi/") !== -1) currentCode = "hi";
    else if (path.indexOf("/es/") !== -1) currentCode = "es";

    langOptions.forEach(option => {
      const code = option.getAttribute("data-lang");
      const flag = option.getAttribute("data-flag");
      const label = option.getAttribute("data-label");

      if (code === currentCode) {
        currentLangFlag.textContent = flag;
        currentLangText.textContent = label;
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }

      option.addEventListener("click", function () {
        let target = "index.html";

        if (code === "vi") target = "vi/" + fileName;
        else if (code === "zh") target = "zh/" + fileName;
        else if (code === "hi") target = "hi/" + fileName;
        else if (code === "es") target = "es/" + fileName;

        // If currently inside a language folder, go up one level first
        if (currentCode !== "en") {
          if (code === "en") {
            target = "../" + fileName;
          } else {
            target = "../" + target;
          }
        }

        window.location.href = target;
      });
    });

    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      const isOpen = !langDropdown.hasAttribute("hidden");

      if (isOpen) {
        langDropdown.setAttribute("hidden", "");
        langBtn.setAttribute("aria-expanded", "false");
      } else {
        langDropdown.removeAttribute("hidden");
        langBtn.setAttribute("aria-expanded", "true");
      }
    });

    langDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("click", function () {
      langDropdown.setAttribute("hidden", "");
      langBtn.setAttribute("aria-expanded", "false");
    });
  }
})();