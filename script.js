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
        prevSearchBtn.addEventListener("click", handleSearchBtnClick);
      }
    });
  }