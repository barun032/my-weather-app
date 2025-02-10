const API_KEY = "a19cbbb24a8091bce3b49c9ac9e5528f";
const URL = "https://api.openweathermap.org/data/2.5/weather?";

const weatherIcon = document.querySelector(".weather-image");
const cityName = document.querySelector(".city-name");
const celcious = document.querySelector(".weather-celcias");
const weatherName = document.querySelector(".weather-name");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector(".search-btn");
const formContainer = document.querySelector(".input-container");

const outerContainer = document.querySelector(".outer-container");
const homePageContainer = document.querySelector(".home-page-container");

const intervalId = setInterval(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}, 1000);

formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityInput.value) {
    getWeatherInfo(cityInput.value);
  } else alert("Please enter a city name");
  cityInput.value = "";
});


function showPosition(position) {
  fetch(
    `${URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      homePageContainer.classList.add("close");
      outerContainer.classList.remove("close");
      clearInterval(intervalId);
      updateWeatherInfo(data);
    })
    .catch(() => showError("Something is wrong"));
}

function showError(err) {
  alert(err);
}

function getWeatherInfo(cityName) {
  fetch(`${URL}q=${cityName}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => updateWeatherInfo(data))
    .catch(() => showError("City not found"));
}

function updateWeatherInfo(weather) {
  if (!weather.code) {
    const weatherType = weather.weather[0].main.toLowerCase();
    switch (weatherType) {
      case "clear":
        weatherIcon.src = "./images/clear.png";
        break;
      case "clouds":
        weatherIcon.src = "./images/clouds.png";
        break;
      case "drizzle":
        weatherIcon.src = "./images/drizzle.png";
        break;
      case "rain":
        weatherIcon.src = "./images/rain.png";
        break;
      case "mist":
        weatherIcon.src = "./images/mist.png";
        break;
      case "snow":
        weatherIcon.src = "./images/snow.png";
        break;
    }
    cityName.textContent = weather.name;
    celcious.textContent = Math.floor(weather.main.temp) + "°C";
    weatherName.textContent = weather.weather[0].main;
    humidity.textContent = weather.wind.deg;
    windSpeed.textContent = weather.wind.speed;
  } else showError(weather.message);
}


// For Date and Time Outputs
const hoursElm = document.querySelector('.hours')
const minutesElm = document.querySelector('.minutes')
const secondsElm = document.querySelector('.seconds')

const dayElm = document.querySelector('.day')
const dateElm = document.querySelector('.date')
const monthElm = document.querySelector('.month')
const yearElm = document.querySelector('.year')

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentDate = new Date();
const options = { weekday: "long" };
const dayName = currentDate.toLocaleDateString("en-US", options);
const day = currentDate.getDate();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear();

dayElm.textContent = dayName
dateElm.textContent = day
monthElm.textContent = month
yearElm.textContent = year

function timeUpdate() {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  hoursElm.textContent = hours < 10 ? '0'+ hours : hours
  minutesElm.textContent = minutes < 10 ? '0'+ minutes : minutes
  secondsElm.textContent = seconds < 10 ? '0'+ seconds : seconds
}
setInterval(timeUpdate, 1000);