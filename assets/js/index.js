import Chart from 'chart.js/auto'
const busqueda = document.querySelector(".form-countries");
const buscar = document.querySelector("#buscar");
let chart; 
async function grafica(valor) {
  try {
    const data = await clima(valor);
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'line',
        data: {
          labels: data.map(row => row.x),
          datasets: [
            {
              label: 'Temperatura en Celsius',
              data: data.map(row => row.y),
              backgroundColor: '#ff8000',
            }
          ]
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}


buscar.addEventListener("click", async () => {
  try {
    //en valor se estaria capturando el valor del input 
    const valor = busqueda.value;
    await grafica(valor);
  } catch (error) {
    console.log(error);
  }
});

async function clima(valor) {
 
try{ 
  const response =await fetch(`
  http://api.openweathermap.org/data/2.5/forecast?q=${valor}&appid=c1e47110da4d70de2cafd30f980532f1&units=metric`);
  const responsejson = await response.json();
  console.log(responsejson);
  const datosUnicos =[];
  const diasAgregados = [];
  const Datos =5;
  let i = 0;
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  for (let clave in responsejson.list) {
  if (i >= Datos) {
    break;
  }
  const fecha = responsejson.list[clave].dt;
  const fechat = new Date(fecha*1000);
  const dia = fechat.getDate();
  const mes = fechat.getMonth() +1;
  const mestexto = meses[mes -1];
  const temperatura = responsejson.list[clave].main.temp;
  const resultado = { x: `${dia} ${mestexto}`, y: temperatura };
 if (!diasAgregados.includes(resultado.x.split(' ')[0])) { 
    datosUnicos.push(resultado);
    diasAgregados.push(resultado.x.split(' ')[0]);
    i++;
  }

}
console.log(datosUnicos);
return datosUnicos;
}
catch(error){ 
console.log(error);
}
}

grafica();


const button = document.querySelector(".contenedor__button");
const contenedor = document.querySelector(".contenedor");
const picture1 = document.querySelector("·btn__open");
const contenedor__principal = document.querySelector(".contenedor__principal");

let isOpen = false;

button.addEventListener('click', function() {
  if (!isOpen) {
    contenedor__grafica
    contenedor.style.transform = 'translateY(-100%)';
    picture1.style.transform = 'rotate(180deg)';
    contenedor__principal.style.height = '0px';
    isOpen = true;
  } else {
    contenedor.style.transform = 'translateY(0)';
    picture1.style.transform = 'rotate(0deg)';
    contenedor__principal.style.height= 'auto';
    isOpen = false;
  }
});