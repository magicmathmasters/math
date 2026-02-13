// script.js
(function () {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const hrefFile = href.split("/").pop().split("#")[0].split("?")[0];

    if (hrefFile === file) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
})();