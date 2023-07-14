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