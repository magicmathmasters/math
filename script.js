// script.js
(function () {
  // Run after DOM is ready (safe even if script moves to <head>)
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    // ✅ Auto year (if #year exists)
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Current file (default index.html)
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    // ✅ Auto-highlight current page links (TOP NAV + FOOTER)
    // Works anywhere you use: <a data-nav href="...">
    document.querySelectorAll("a[data-nav]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();

      // Skip non-page links (mailto, tel, external http(s), javascript)
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("javascript:")
      ) {
        a.removeAttribute("aria-current");
        a.classList.remove("active");
        return;
      }

      // Resolve href filename (ignore folders, hashes, query)
      const hrefFile = href.split("/").pop().split("#")[0].split("?")[0];

      if (hrefFile === file) {
        a.setAttribute("aria-current", "page");
        a.classList.add("active"); // optional CSS hook
      } else {
        a.removeAttribute("aria-current");
        a.classList.remove("active");
      }
    });

    // ===== LANGUAGE DROPDOWN =====
    const langBtn = document.getElementById("langBtn");
    const langDropdown = document.getElementById("langDropdown");
    const currentLangText = document.getElementById("currentLangText");
    const langOptions = document.querySelectorAll(".lang-option");

    if (langBtn && langDropdown && currentLangText && langOptions.length) {
      const path = window.location.pathname.toLowerCase();
      const fileName = (path.split("/").pop() || "index.html").toLowerCase();

      let currentCode = "en";
      if (path.indexOf("/vi/") !== -1) currentCode = "vi";
      else if (path.indexOf("/zh/") !== -1) currentCode = "zh";
      else if (path.indexOf("/hi/") !== -1) currentCode = "hi";
      else if (path.indexOf("/es/") !== -1) currentCode = "es";

      langOptions.forEach((option) => {
        const code = option.getAttribute("data-lang");
        const label = option.getAttribute("data-label");

        if (code === currentCode) {
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

          // If currently in a language folder, go up one level first
          if (currentCode !== "en") {
            if (code === "en") target = "../" + fileName;
            else target = "../" + target;
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
  });
})();
// Enter on Start screen = Start (when button is enabled)
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const quizVisible =
    !el("qa").classList.contains("hide") && el("qa").style.display !== "none";
  if (quizVisible) return; // your quiz Enter handler will run instead

  const startVisible =
    el("profileBox").style.display !== "none" &&
    el("startButtons").style.display !== "none";

  if (!startVisible) return;

  // Avoid Enter on the dropdown accidentally starting (optional but recommended)
  if (e.target && e.target.tagName === "SELECT") return;

  const startBtn = el("startBtn");
  if (startBtn && !startBtn.disabled) {
    e.preventDefault();
    start();
  }
});