// nav-active.js
(function () {
  function normalisePath(pathname) {
    pathname = (pathname || "").split("?")[0].split("#")[0];
    if (pathname.endsWith("/")) pathname += "index.html";
    return pathname.toLowerCase();
  }

  const current = normalisePath(location.pathname);

  document.querySelectorAll(".nav a[href]").forEach((a) => {
    const hrefPath = normalisePath(new URL(a.getAttribute("href"), location.href).pathname);
    if (hrefPath === current) a.classList.add("active");
  });
})();