// script.js
(function () {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === file) a.setAttribute("aria-current", "page");
  });
})();