const form = document.querySelector(".header__form");
const labelDate = document.querySelector(".clock");
const labelDay = document.querySelector(".square-day");
const labelAbreDay = document.querySelector(".abbreviation-day");
const labelMonth = document.querySelector(".month");
const region = document.querySelector(".square-country");
const temperatura = document.querySelector(".square-degrees");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const amanecer = document.querySelector(".dawn");
const atardecer = document.querySelector(".sunset");
const icon = document.querySelector(".clima-icon");

//Uso de la API de international
//Forma sencilla de formatear fechas y horas
setInterval(function () {
  const now = new Date();

  const optionClock = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  const optionDay = {
    day: "numeric",
  };

  const optionAbre = {
    weekday: "short",
  };

  const optionMonth = {
    month: "long",
  };

  labelDate.textContent = new Intl.DateTimeFormat("local", optionClock).format(now);
  labelDay.textContent = new Intl.DateTimeFormat("local", optionDay).format(now);
  labelAbreDay.textContent = new Intl.DateTimeFormat("local", optionAbre).format(now);
  labelMonth.textContent = new Intl.DateTimeFormat("local", optionMonth).format(now);
}, 1000);

//Toma del Input
const tomaCiudadInput = function () {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const {
      elements: { ciudad },
    } = event.target;

    console.log(ciudad.value);
    busquedaClima(ciudad.value);
    //region.textContent = ciudad.value;
    event.currentTarget.reset();
  });
};

tomaCiudadInput();


const busquedaClima = async function (busqueda) {
  try {
    const posClima = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${busqueda}&appid=c1e47110da4d70de2cafd30f980532f1&units=metric&lang=es`);
    const dataClima = await posClima.json();
    console.log(dataClima);

    if (!posClima.ok)
      throw new Error(`${dataClima.message} (${posClima.status})`);

    const { main, sys, wind, weather } = dataClima;
    console.log(weather[0]);

    let icon_Nubes = [weather[0].main];
    console.log(icon_Nubes);

    if (icon_Nubes.includes("Clouds")) {
      icon.setAttribute("href", "./assets/vectores/icomoon/symbol-defs.svg#icon-icon-Nubes");
    }

    temperatura.textContent = Math.trunc(main.temp);
    min.textContent = `${Math.trunc(main.temp_min)}°`;
    max.textContent = `${Math.trunc(main.temp_max)}°`;
    region.textContent = `${dataClima.name}, ${sys.country}`;

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

    function convertTime(dt, timezone) {
      let d = new Date(dt * 1000);
      d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
      d.setSeconds(d.getSeconds() + timezone);

      const date = new Date(d);
      console.log(date);

      // labelDate.textContent =
      // labelDay.textContent =
      // labelAbreDay.textContent =
      // labelMonth.textContent =

      return d;
    }

    //console.log(convertTime(dataClima.dt, dataClima.timezone));
    dte = convertTime(dataClima.dt, dataClima.timezone);

  } catch (err) {
    alert(err);
  }
};

document.addEventListener("DOMContentLoaded", function (ev) {
  console.log("HTML analizado y dom construido");
});

/* function actual() {
        let fecha = new Date(); //Actualizar fecha.
        let hora = fecha.getHours(); //hora actual
        let minuto = fecha.getMinutes(); //minuto actual
        let segundo = fecha.getSeconds(); //segundo actual
        if (hora < 10) {
          //dos cifras para la hora
          hora = "0" + hora;
        }
        if (minuto < 10) {
          //dos cifras para el minuto
          minuto = "0" + minuto;
        }
        if (segundo < 10) {
          //dos cifras para el segundo
          segundo = "0" + segundo;
        }
        //devolver los datos:
        let mireloj = hora + " : " + minuto + " : " + segundo;
        return mireloj;
      } */
