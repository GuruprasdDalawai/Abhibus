window.history.pushState({}, "", document.URL);

window.onpopstate = function (event) {
  window.history.pushState({}, "", document.URL);
};
