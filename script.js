// Preklapljanje vsebine v glavnem prikaznem delu.
const navButtons = document.querySelectorAll(".nav-button");
const views = document.querySelectorAll(".view");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedView = button.dataset.view;

    navButtons.forEach((item) => item.classList.remove("active"));
    views.forEach((view) => view.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(selectedView).classList.add("active");
  });
});

// Pridobivanje trenutnega vremena za Los Angeles prek Open-Meteo API-ja.
async function loadWeather() {
  const weatherDescription = document.getElementById("weather-description");
  const weatherTemp = document.querySelector(".weather-temp");

  const url = "https://api.open-meteo.com/v1/forecast?latitude=34.0522&longitude=-118.2437&current=temperature_2m,weather_code&timezone=America%2FLos_Angeles";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Napaka pri pridobivanju vremenskih podatkov.");
    }

    const data = await response.json();
    const temperature = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;

    weatherTemp.textContent = `${temperature} °C`;
    weatherDescription.textContent = getWeatherDescription(code);
  } catch (error) {
    weatherTemp.textContent = "-- °C";
    weatherDescription.textContent = "Vremenskih podatkov trenutno ni mogoče naložiti.";
    console.error(error);
  }
}

function getWeatherDescription(code) {
  if (code === 0) return "Jasno vreme";
  if ([1, 2, 3].includes(code)) return "Delno oblačno do oblačno";
  if ([45, 48].includes(code)) return "Megla";
  if ([51, 53, 55, 56, 57].includes(code)) return "Rosjenje";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Dež";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Sneg";
  if ([95, 96, 99].includes(code)) return "Nevihta";
  return "Vremenski podatki";
}

loadWeather();
