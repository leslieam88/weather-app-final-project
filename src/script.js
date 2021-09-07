function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let dayNum = date.getDate();
  return `${day}, ${month} ${dayNum}  ${hours}:${minutes}`;
}

function getForecast(coords) {
  let apiKey = "71871e214b4db04ba50273e77608de7b";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function getCelsiusForecast(coords) {
  let apiKey = "71871e214b4db04ba50273e77608de7b";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayCelsiusForecast);
}

function showFTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("#number");
  currentTempElement.innerHTML = `${currentTemp}`;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  let feels = document.querySelector("#feelsLike");
  let feelsTemp = Math.round(response.data.main.feels_like);
  feels.innerHTML = `${feelsTemp}°F`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed} mph`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.removeAttribute("href");
  let celsius = document.querySelector("#celsius");
  celsius.setAttribute("href", "#");
  getForecast(response.data.coord);
}
function showCTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("#number");
  currentTempElement.innerHTML = `${currentTemp}`;
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  let feels = document.querySelector("#feelsLike");
  let feelsTemp = Math.round(response.data.main.feels_like);
  feels.innerHTML = `${feelsTemp}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed} km/h`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let celsius = document.querySelector("#celsius");
  celsius.removeAttribute("href");
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.setAttribute("href", "#");
  getCelsiusForecast(response.data.coord);
}

function getCity(value) {
  let searchInput = document.getElementById("city-input");
  let city = searchInput.value;
  let apiKey = "71871e214b4db04ba50273e77608de7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showFTemp);
}
function getCelsiusCity(value) {
  let celsius = document.querySelector("#celsius");
  celsius.removeAttribute("href");
  let searchInput = document.getElementById("city-input");
  let city = searchInput.value;
  let apiKey = "71871e214b4db04ba50273e77608de7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCTemp);
}

function formatDay(ts) {
  let date = new Date(ts * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class= "forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          id="weather-icon"
          width="55"
          class="weather-icon"
        />
            <div class= "forecast-temperatures">
            <span class ="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°F</span>
            <div class= "forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}°F</div> 
			
        </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCelsiusForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class= "forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          id="weather-icon"
          width="55"
          class="weather-icon"
        />
            <div class= "forecast-temperatures">
            <span class ="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°C</span>
            <div class= "forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}°C</div> 
			
        </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  getCity(cityName.value);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", getCity);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", getCelsiusCity);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
