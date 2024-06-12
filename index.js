async function search(country) {

     let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=3`)
     let data = await response.json();

     displayCurrentTemp( data.location, data.current);
     displayNextDays(data.forecast.forecastday);
}


search('cairo');



document.getElementById("search").addEventListener("keyup", event => { search(event.target.value) });







let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrentTemp(loc, current) {
     if (current != null) {
          let newDate = new Date();
          let cartoona = `<div class="card w-33  my-3">
            <div class="card-header d-flex justify-content-between bg-light-subtle pt-3 h5">
              <h5>${days[newDate.getDay()]}</h5>
              <h5>${newDate.getDate() + " " + months[newDate.getMonth()]}</h5>
            </div>
            <div class="card-body">
              <h2 class="card-text">${loc.name}</h2>
              <h2 class="card-text">${current.temp_c}<sup>o</sup>C</h2>
              <img src="https:${current.condition.icon}" alt="" width=90 class=ms-1>  
              <div class=" pb-4 h5 text-primary">${current.condition.text}</div>  
               <span class="me-5"><img src="images/icon-umberella.png" alt="">20%</span>
               <span class="me-5"><img src="images/icon-wind.png" alt="">18km/h</span><span class="me-5"><img src="images/icon-compass.png" alt="">East</span>
            </div>
          </div>`;
          document.getElementById("forecast").innerHTML = cartoona
     }
}

function displayNextDays(forecastData) {

     let cartoona = "";
     console.log(forecastData)
     for (let i = 1; i < forecastData.length; i++) {

          let forecastDate = new Date(forecastData[i].date);
       cartoona += `<div class="card w-33 my-3 text-center mx-2 ">
                       <div class="card-header  bg-light-subtle pt-3 h5">
                           <h5>${days[forecastDate.getDay()]}</h5>
                       </div>
                       <div class="card-body">
                           <img src="https:${forecastData[i].day.condition.icon}" alt="" width=90 class=ms-1>
   
                           <div class="py-3 h4">max temp : ${forecastData[i].day.maxtemp_c}<sup>o</sup>C</div>
                           <small  class="py-3 h4" > min temp : ${forecastData[i].day.mintemp_c}<sup>o</sup></small>
                           <div class="py-3 h5 text-primary">${forecastData[i].day.condition.text}</div>
                       </div>
                   </div>`;
     }
   
     document.getElementById("forecast").innerHTML += cartoona;
   }
