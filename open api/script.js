// Paste your OpenWeather API key between the quotes.
const API_KEY = "32306d5d36f78b22ed080dad2fb55da4";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("result");

  if (!city) {
    result.textContent = "Please enter a city name.";
    return;
  }

  if (API_KEY === "32306d5d36f78b22ed080dad2fb55da4") {
    result.textContent = "Please add your OpenWeather API key in script.js.";
    return;
  }

  result.textContent = "Loading...";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      result.textContent = data.message || "Could not get weather.";
      return;
    }

    result.innerHTML = `
      <h2>${data.name}</h2>
      <p><b>Temperature:</b> ${data.main.temp} °C</p>
      <p><b>Weather:</b> ${data.weather[0].description}</p>
      <p><b>Humidity:</b> ${data.main.humidity}%</p>
      <p><b>Wind Speed:</b> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    result.textContent = "Network error. Check your internet connection.";
  }
}
