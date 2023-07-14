// VARIABLE DECLARATIONS //
const apiKey = "d8cb1710dc74e59aa238e784df04876d";
const searchButton = document.querySelector(".search");
const searchInput = document.querySelector("input");
const weather = document.querySelector(".today-weather");
const forecast = document.querySelector(".forecast");
const searchHistory = document.querySelector(".search-history");
const forecastTitle = document.querySelector(".forecast-title");
const storedCityString = localStorage.getItem("city");
const storedCity = JSON.parse(storedCityString);

// EMPTY ARRAY TO STORE SEARCH HISTORY //
let prevSearches = [];

// CREATE BUTTONS FOR STORED CITIES //
if (storedCity) {
    storedCity.forEach((city) => {
      if (!prevSearches.includes(city)) {
        prevSearches.push(city);
        const prevSearchBtn = document.createElement("button");
        prevSearchBtn.innerText = city;
        prevSearchBtn.classList.add("search-history");
        searchHistory.prepend(prevSearchBtn);
  
        function handleSearchBtnClick(e) {
          const cityName = e.target.innerText;
          searchInput.value = cityName;
          displayWeather();
        }
        // EVENT LISTENER FOR EACH BUTTON, SET SEARCH INPUT VALUE //
        prevSearchBtn.addEventListener("click", handleSearchBtnClick);
      }
    });
  }

// RETRIEVE SEARCH VALUE, ASSIGN TO cityName, MAKE VISIBLE //
  function displayWeather() {
    const cityName = searchInput.value;
    forecastTitle.style.display = "block";

// FETCH REQUEST TO OpenWeather //  
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${cityName},US`
    )
         // CONVERT TO JSON //
      .then((res) => res.json())
      .then((data) => {
        // SET DISPLAY PROPERTY TO BLOCK TO MAKE VISIBLE //
        weather.style.display = "block";
        // HTML STRING //
        const weatherDiv = `
          <h2>${data.name} ${dayjs.unix(data.dt).format("MM/DD/YYYY")}</h2>`;
        
        // UODATE WEATHER WITH DETAILS BELOW //
        weather.innerHTML = `
          <h2>${data.name} ${dayjs.unix(data.dt).format("MM/DD/YYYY")}</h2>
          <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
          <p>${data.weather[0].main}</p>
          <p>Temp: ${data.main.temp}°</p>
          <p>Wind: ${data.wind.speed}mph</p>
          <p>Humidity: ${data.main.humidity}%</p>`;

        // CHECK IF SEARCH IS ALREADY STORED, ADD IF NOT //
        if (!prevSearches.includes(cityName)) { 
          prevSearches.push(cityName);
            
        // STORE SEARCH //
          localStorage.setItem("city", JSON.stringify(prevSearches));
  
        // CREATE NEW BUTTON //
          const prevSearchBtn = document.createElement("button");
          prevSearchBtn.innerText = searchInput.value;
        // ADD CSS CLASS //
          prevSearchBtn.classList.add("search-history");
        // PREPEND BUTTON TO SEARCH HISTORY ELEMENT //
          searchHistory.prepend(prevSearchBtn);
  
        // EVENT HANDLER FUNCTION FOR HISTORY BUTTONS, SEARCH INPUT VALUE AGAIN WHEN CLICKED //
          function handleSearchBtnClick(e) {
            const cityName = e.target.innerText;
            searchInput.value = cityName;
            displayWeather();
          }
          prevSearchBtn.addEventListener("click", handleSearchBtnClick);
        }

        // v FORECAST DATA v //
  
        // FETCH REQUEST TO OpenWeather //
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&lat=${data.coord.lat}&lon=${data.coord.lon}`
        )
            // CONVERT TO JSON //
          .then((res) => res.json())
          .then((forecastData) => {
            forecast.innerHTML = "";
  
            forecastData.list.forEach((day) => {
                // CHECK IF FORECAST TIME INCLUDES 12:00:00, GNERATE HTML STRING IF SO, APPEND TO FORECAST ELEMENT //
              if (day.dt_txt.includes("12:00:00")) {
                forecast.innerHTML += `
                  <div class="day">
                    <h3>${dayjs(day.dt_txt).format("MM/DD/YYYY")}</h3>
                    <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png">
                    <p>${day.weather[0].main}</p>
                    <p>Temp: ${day.main.temp}°</p>
                    <p>Wind: ${day.wind.speed}mph</p>
                    <p>Humidity: ${day.main.humidity}%</p>
                  </div>`;
              }
            });
          });
      });
  }
  
// EVENT LISTENER FOR SEARCH BUTTON //
searchButton.addEventListener("click", displayWeather);
