// ====== CONFIGURATION ======
const apiKey = "32d8bbc4c7168896702dbed3b0f94e9f"; // Replace with your API key
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// ====== DOM ELEMENTS ======
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");
const transmitBtn = document.getElementById("transmit-btn");
const transmitStatus = document.getElementById("transmit-status");
const faultBtn = document.getElementById("simulate-fault-btn");
const faultStatus = document.getElementById("fault-status");
const systemStateDisplay = document.getElementById("system-state");

// ====== SYSTEM STATE ======
let systemState = "Running";
function setState(state) {
  systemState = state;
  systemStateDisplay.textContent = `System State: ${systemState}`;
  // Optionally disable/enable UI based on state
  if (systemState === "Shutdown") {
    searchInput.disabled = true;
    searchBtn.disabled = true;
    transmitBtn.disabled = true;
    faultBtn.disabled = true;
  } else {
    searchInput.disabled = false;
    searchBtn.disabled = false;
    transmitBtn.disabled = false;
    faultBtn.disabled = false;
  }
}
window.setState = setState; // So HTML buttons can call setState
setState(systemState); // Initialize

// ====== WEATHER FETCHING ======
async function getWeather(city) {
  if (!city) return;
  try {
    const response = await fetch(apiURL + encodeURIComponent(city) + `&appid=${apiKey}`);
    if (!response.ok) {
      showError("City Not Found");
      return;
    }
    const data = await response.json();
    updateWeatherUI(data);
    saveToHistory(data);
    hideError();
  } catch (err) {
    showError("Network error or API limit reached");
  }
}

// ====== UI UPDATES ======
function updateWeatherUI(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " mp/h";
  // Weather icon
  const main = data.weather[0].main;
  let icon = "clouds.png";
  if (main === "Clouds") icon = "clouds.png";
  else if (main === "Rain") icon = "rain.png";
  else if (main === "Clear") icon = "clear.png";
  else if (main === "Snow") icon = "snow.png";
  else if (main === "Wind") icon = "wind.png";
  else if (main === "Mist") icon = "mist.png";
  else if (main === "Drizzle") icon = "drizzle.png";
  weatherIcon.src = `images/${icon}`;
  weatherDiv.style.display = "block";
}

function showError(msg) {
  errorDiv.style.display = "block";
  errorDiv.querySelector("p").textContent = msg;
  weatherDiv.style.display = "none";
}

function hideError() {
  errorDiv.style.display = "none";
  weatherDiv.style.display = "block";
}

// ====== WEATHER HISTORY STORAGE ======
function saveToHistory(data) {
  const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  history.unshift({
    city: data.name,
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    time: new Date().toLocaleString()
  });
  localStorage.setItem('weatherHistory', JSON.stringify(history.slice(0, 10)));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  const tbody = document.querySelector("#history-table tbody");
  tbody.innerHTML = "";
  history.forEach(entry => {
    const row = `<tr>
      <td>${entry.city}</td>
      <td>${entry.temp}°C</td>
      <td>${entry.humidity}%</td>
      <td>${entry.wind} mp/h</td>
      <td>${entry.time}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
  analyzeTemperatures();
}

