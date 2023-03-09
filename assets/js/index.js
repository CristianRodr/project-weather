import Chart from 'chart.js/auto'
async function grafica() {
  try {
    const data = await clima();
    new Chart(
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




async function clima() {
try{ 
  const response =await fetch(`
  http://api.openweathermap.org/data/2.5/forecast?q=bogota&appid=c1e47110da4d70de2cafd30f980532f1&units=metric`);
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
const picture1 = document.querySelector(".img__button");

let isOpen = false;

button.addEventListener('click', function() {
  if (!isOpen) {
    contenedor.style.transform = 'translateY(-100%)';
    picture1.style.transform = 'rotate(180deg)';
    isOpen = true;
  } else {
    contenedor.style.transform = 'translateY(0)';
    picture1.style.transform = 'rotate(0deg)';
    isOpen = false;
  }
});