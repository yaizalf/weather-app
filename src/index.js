// Show Today
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekDays[now.getDay()];

let todayDate = document.querySelector("#today");
todayDate.innerHTML = `<strong>TODAY</strong> ${day}, ${hours}:${minutes}`;

// Search engine city & temp change
function newCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input");

  let newLocation = document.querySelector("#location");
  newLocation.innerHTML = `${userCity.value}`;

  let apiKey = "940c8ed5f2cc9111c0cd74ba210060b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&units=metric`;

  function newTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);

    let newTemp = document.querySelector("#nowTemp");
    newTemp.innerHTML = `${temperature}º`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(newTemperature);
}
let searchButton = document.querySelector("#go-button");
searchButton.addEventListener("click", newCity);

// Current location & temp change
function changeData(response) {
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = `${response.data.name}`;
  let temp = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#nowTemp");
  currentTemperature.innerHTML = `${temp}º`;
}
function retrievePosition(position) {
  let apiKey = "940c8ed5f2cc9111c0cd74ba210060b2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeData);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
// Celsius - Fahrenheit
let fahr = 60;
let cels = 16;

function celsTemp(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cels}º`;
}
let celsiusLink = document.querySelector("#cels-link");
celsiusLink.addEventListener("click", celsTemp);

function fahrTemp(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${fahr}º`;
}
let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", fahrTemp);
