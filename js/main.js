const api = {
  key: "13fe7b805286a007419406d8093bbb28",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".searchBox");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.textContent = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.textContent = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.textContent = `${Math.round(weather.main.temp)}`;

  let elWeather = document.querySelector(".weather");
  elWeather.textContent = weather.weather[0].main;

  let highLow = document.querySelector(".hight-low");
  highLow.textContent = `max${Math.round(weather.main.temp_min)}°C / min${Math.round(weather.main.temp_max)}°C`
}
function dateBuilder(s) {
  let months = [
    "January",
    "Febraury",
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thirsday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
