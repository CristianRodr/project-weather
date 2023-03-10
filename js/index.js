"use strict";

const form = document.querySelector(".form");
const region = document.querySelector(".card__region");
const tem = document.querySelector(".card-tem");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const humedad = document.querySelector(".humedad");
const velocidad = document.querySelector(".velocidad");
const presion = document.querySelector(".presion");
const amanecer = document.querySelector(".amanecer");
const atardecer = document.querySelector(".atardecer");
const countriesContainer = document.querySelector(".cards");
const text = document.querySelector("#paragraph");

const tomaCiudadInput = function () {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const {
      elements: { ciudad },
    } = event.target;

    console.log(ciudad.value);
    //busquedaClima(ciudad.value);
    clima(ciudad.value);
    //region.textContent = ciudad.value;
    event.currentTarget.reset();
  });
};

tomaCiudadInput();

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//OJO PRIMER HTML PRIMER DIA
const labelDate = document.querySelector(".date");
//Uso de la API de international
//Forma sencilla de formatear fechas y horas
setInterval(function () {
  const now = new Date();

  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    weekday: "short",
    day: "numeric",
    month: "long",
  };

  labelDate.textContent = new Intl.DateTimeFormat("local", options).format(now);
}, 1000);

const busquedaClima = async function (busqueda) {
  try {
    const posClima = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${busqueda}&appid=c1e47110da4d70de2cafd30f980532f1&units=metric`);
    const dataClima = await posClima.json();
    console.log(dataClima);

    if (!posClima.ok)
      throw new Error(`${dataClima.message} (${posClima.status})`);

    const { main, sys, wind, weather } = dataClima;
    //console.log(main, sys, wind, weather[0]);

    tem.textContent = Math.trunc(main.temp);
    min.textContent = `${main.temp_min}°`;
    max.textContent = `${main.temp_max}°`;
    humedad.textContent = `${main.humidity}%`;
    velocidad.textContent = wind.speed;
    presion.textContent = main.pressure;

    const output = function (amanecer) {
      let sunrise = moment.unix(amanecer).utc();
      return moment(sunrise._i).format("LT");
    };

    const closet = function (atardecer) {
      let sunset = moment.unix(atardecer).utc();
      return moment(sunset._i).format("LT");
    };

    const sunrise = output(sys.sunrise);
    const sunset = closet(sys.sunset);

    amanecer.textContent = sunrise;
    atardecer.textContent = sunset;
  } catch (err) {
    alert(err);
  }
};

//////////////////////////////////////////////////////////

/*const dato = 1677841880000
console.log(moment(dato).format('LT'));
console.log(moment(1677885313000).format('LT'));
let sunrise = moment.unix(1677841880).utc();
console.log(sunrise);
let sunset = moment.unix(1677885313).utc();
console.log(sunset);*/

//////////////////////////////////////////////////////

// sunrise: 1677841880
// sunset: 1677885313

/*const insertarBusquda = function () {
     const dato = objeto.find( obj => obj.dt === tiempo);
   }
   insertarBusquda(recipiente, 1677823200)*/

//API meteorology actual
//https://api.openweathermap.org/data/2.5/weather?q=${dato}&appid=c1e47110da4d70de2cafd30f980532f1&units=metric

//API 5 dias/3hors
//http://api.openweathermap.org/data/2.5/forecast?q=${dato}&appid=c1e47110da4d70de2cafd30f980532f1&units=metric

/* Grupo de parámetros meteorológicos (lluvia, nieve, extremos, etc.).
Rain 10d light rain, Fog 50d fog, Clouds 03d scattered clouds, Clouds 02n pocas nubes, Clear 01n clear sky,
Clouds 04n overcast clouds, clouds 02d few clouds */

//////////////////////////////////////////////////////////////////////////////////////////////
//05 DAYS
//npm run compile:sass

const containerMovements = document.querySelector(".cards");
const controlDos = document.querySelector(".control-2");

const clima = async function (busqueda) {
  try {
    const posClima = await fetch(`
    http://api.openweathermap.org/data/2.5/forecast?q=${busqueda}&appid=c1e47110da4d70de2cafd30f980532f1&units=metric`);
    const dataClima = await posClima.json();
    console.log(dataClima);

    if (!posClima.ok)
      throw new Error(`${dataClima.message} (${posClima.status})`);

    const climaOp = dataClima;
    const listArr = climaOp.list;
    console.log(climaOp);
    console.log(listArr);

    region.textContent = climaOp.city.name;

    const converList = listArr
      .map((listNuva) => listNuva.dt_txt.split(" "))
      .filter((fil) => fil.includes("00:00:00"))
      .map((orden) => orden.join(" "));

    const recepcionObje = [];

    for (const converListElement of converList) {
      const extraer = listArr.find((ext) => ext.dt_txt === converListElement);
      recepcionObje.push(extraer);
    }
    recepcionObje.unshift(listArr.at(0));
    recepcionObje.pop();
    console.log(recepcionObje);

    containerMovements.innerHTML = "";

    recepcionObje.forEach((recep) => {
      const { main } = recep;

      const tim = new Date(recep.dt_txt);

      const optionsDia = {
        weekday: "long",
      };

      const optionsSem = {
        day: "numeric",
        month: "long",
      };

      const diaSem = moment(tim).format("dddd");
      //console.log(diaSem);
      const semDia = moment(tim).format("LL");
      //console.log(semDia)

      const html = `
  <div class="paragrafo">
  
  <p class="card__row card-diatexto">${diaSem}</p>
            <p class="card__row card-fecha">${semDia}</p>
            <svg class="" width="35" height="35">
                <use xlink:href="images/icons.svg#icon-Icono2"></use>
              </svg>
            <ul class="min__max">
            <li class= "min__max--ajuste"><p class="card__row">min</p><span class="min">${Math.trunc(
              main.temp_min
            )}°</span></li>
            <hr>
            <li class= "min__max--ajuste"><p class="card__row">max</p><span class="max">${Math.trunc(
              main.temp_max
            )}°</span></li>
            </ul>
            <a href="#">more info</a>
        </div>
  `;

      containerMovements.insertAdjacentHTML("afterbegin", html);
    });

    const tomaFecha = function (intFecha) {
      controlDos.innerHTML = "";
      const converFecha = listArr
        .map((listNuva) => listNuva.dt_txt.split(" "))
        .filter((fil) => fil.includes(intFecha))
        .map((orden) => orden.join(" "));

      //console.log(converFecha)

      const recepcionObjTar = [];

      for (const converFechaElement of converFecha) {
        const extraer = listArr.find(
          (ext) => ext.dt_txt === converFechaElement
        );
        recepcionObjTar.push(extraer);
      }

      //console.log(recepcionObjTar);
      recepcionObjTar.forEach((cards) => {
        const { main, wind } = cards;

        const fechaCard = new Date(cards.dt_txt);
        //console.log(fechaCard)

        const options = {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        };

        const tiemCar = new Intl.DateTimeFormat("local", options).format(
          fechaCard
        );

        const html = `
            <div class="cards-efecto">
            <p class="card__row card-fecha">${tiemCar}</p>
            <svg class="" width="35" height="35">
                <use xlink:href="./images/icons.svg#icon-Icono2"></use>
              </svg>
            <p class="card__row"><span class="card-tem">${main.temp}°</span></p>
            <div class="magnitudes--ajuste">
            <svg class="" width="19" height="20">
                <use xlink:href="images/icons.svg#icon-Presion"></use>
              </svg>
            <p class="card__row"><span class="presion">${main.pressure}</span> mm</p></div>
            <div class="magnitudes--ajuste">
            <svg class="humedad" width="18.79" height="20">
                <use xlink:href="images/icons.svg#icon-Humedad"></use>
              </svg>
            <p class="card__row"><span class="humedad">${main.humidity}</span>%</p></div>
            <div class="magnitudes--ajuste">
            <svg class="" width="20" height="16.7">
                <use xlink:href="images/icons.svg#icon-Velocidad"></use>
              </svg>
            <p class="card__row"><span class="velocidad">${wind.speed}</span> m/s</p></div>
        </div>
        `;
        controlDos.insertAdjacentHTML("afterbegin", html);
      });
    };

    const semDia = document.querySelectorAll(".card-fecha");
    const ruta = document.querySelectorAll("a");

    ruta.forEach((a) => {
      a.addEventListener("click", (ev) => {
        const rutaEvent =
          ev.target.ownerDocument.activeElement.parentElement.childNodes[3]
            .innerHTML;
        console.log(rutaEvent);

        const horaRuta = new Date(rutaEvent);
        console.log(horaRuta);

        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        };

        const timApi = new Intl.DateTimeFormat("lt-LT", options).format(
          horaRuta
        );
        console.log(timApi);
        tomaFecha(timApi);
      });
    });

    const borra = function () {};

    //console.log(posClima);
  } catch (err) {
    alert(err);
  }
};