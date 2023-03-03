"use strict";
const link = document.querySelector(".verMas");

const openHidden = function () {
  document.querySelector(".details__conditions").classList.remove("hidden");
};

link.addEventListener("click", openHidden);
