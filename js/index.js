"use strict";
const link = document.querySelector(".verMas");
const link1 = document.querySelector(".verMas1");
const link2 = document.querySelector(".verMas2");
const link3 = document.querySelector(".verMas3");
const link4 = document.querySelector(".verMas4");

const openHidden = function () {
  document.querySelector(".details__conditions").classList.remove("hidden");
  document.querySelector(".details__conditions1").classList.add("hidden");
  document.querySelector(".details__conditions2").classList.add("hidden");
  document.querySelector(".details__conditions3").classList.add("hidden");
  document.querySelector(".details__conditions4").classList.add("hidden");
};

const openHidden1 = function () {
  document.querySelector(".details__conditions1").classList.remove("hidden");
  document.querySelector(".details__conditions").classList.add("hidden");
  document.querySelector(".details__conditions2").classList.add("hidden");
  document.querySelector(".details__conditions3").classList.add("hidden");
  document.querySelector(".details__conditions4").classList.add("hidden");
};

const openHidden2 = function () {
  document.querySelector(".details__conditions2").classList.remove("hidden");
  document.querySelector(".details__conditions").classList.add("hidden");
  document.querySelector(".details__conditions1").classList.add("hidden");
  document.querySelector(".details__conditions3").classList.add("hidden");
  document.querySelector(".details__conditions4").classList.add("hidden");
};

const openHidden3 = function () {
  document.querySelector(".details__conditions3").classList.remove("hidden");
  document.querySelector(".details__conditions").classList.add("hidden");
  document.querySelector(".details__conditions1").classList.add("hidden");
  document.querySelector(".details__conditions2").classList.add("hidden");
  document.querySelector(".details__conditions4").classList.add("hidden");
};

const openHidden4 = function () {
  document.querySelector(".details__conditions4").classList.remove("hidden");
  document.querySelector(".details__conditions").classList.add("hidden");
  document.querySelector(".details__conditions1").classList.add("hidden");
  document.querySelector(".details__conditions2").classList.add("hidden");
  document.querySelector(".details__conditions3").classList.add("hidden");
};

link.addEventListener("click", openHidden);
link1.addEventListener("click", openHidden1);
link2.addEventListener("click", openHidden2);
link3.addEventListener("click", openHidden3);
link4.addEventListener("click", openHidden4);