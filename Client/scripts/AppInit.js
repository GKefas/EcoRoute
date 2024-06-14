//SET LOCAL STORAGE

document.addEventListener("DOMContentLoaded", (event) => {
  if (typeof Storage === undefined) {
    console.log("Sorry! Your browser version doesn't support Storage");
    return;
  }

  if (typeof Storage !== "undefined") {
    localStorage.setItem("isLoggedIn", "false");

    const Buttons = document.querySelectorAll(".toToggle");
    const loginContent = document.getElementById("login-text");

    if (localStorage.getItem("isLoggedIn")) {
      Buttons.forEach((button) => {
        button.classList.remove("display-none");
      });
      loginContent.textContent = "Sign Out";
    }
  }
});
//MAP initialization
const map = L.map("map").setView([39.643, 22.413], 10);

//default Map
const defaultMap = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
defaultMap.addTo(map);

//CartoMap Overwrite
const cartoMap = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);
cartoMap.addTo(map);

// Helper Functions

const isEmpty = (data) => {
  let value;
  data !== null ? (value = data) : (value = "-");
  return value;
};

//DATA RETRIEVE FROM BACKEND AND PLACE MARKERS

const defaultIcon = L.icon({
  iconUrl: "../../logos/home.png",

  iconSize: [28, 38], // size of the icon
});

const url = "http://127.0.0.1:3001";
const startingEndPoint = "/?input=";
const generalInfoUrl = "/generalInfo";

fetch(url.concat(startingEndPoint), { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    data.map((gasStation) => {
      let marker = L.marker(
        [gasStation.gasStationLat, gasStation.gasStationLong],
        {
          icon: defaultIcon,
        }
      ).addTo(map);
      // phone1
      marker.bindPopup(`
      <div class="marker-heading-container">
        <img src="logos/default.png" alt="Gas Station Logo"/>
        <div class="heading-content">
          <div class="marker-icon-and-text-container">
          <i class="fa-solid fa-gas-pump marker-brand-name-icon"></i>
          <h1 class="marker-brand-name">${gasStation.fuelCompNormalName}</h1>
          </div>
          <div class="marker-icon-and-text-container">
          <i class="fa-solid fa-user marker-gas-station-icon"></i>
          <h2 class="marker-gas-station-owner">${
            gasStation.gasStationOwner
          }</h2>
          </div>
          <div class="marker-icon-and-text-container">
          <i class="fa-solid fa-location-dot marker-gas-station-address-icon"></i>
          <p class="marker-gas-station-address clear">${
            gasStation.gasStationAddress
          }</p>
          </div>
          <div class="marker-icon-and-text-container">
          <i class="fa-solid fa-phone marker-gas-station-phone-icon"></i>
          <p class="marker-gas-station-phone clear">${isEmpty(
            gasStation.phone1
          )}</p>
          </div>
        </div>
      </div>
      `);
    });
    console.log(data);
    fetch(url.concat(generalInfoUrl), { method: "GET" })
      .then((response) => response.json())
      .then((generalInfo) => {
        const displayCount = document.getElementById("GasStationsCount");
        displayCount.innerText = generalInfo.CountGasStations;

        const displayAvg = document.getElementById("AveragePrice");
        displayAvg.innerText = generalInfo.AvgPrice;

        const displayMin = document.getElementById("LowestPrice");
        displayMin.innerText = generalInfo.MinPrice;

        const displayMax = document.getElementById("HighestPrice");
        displayMax.innerText = generalInfo.MaxPrice;
      });
  })
  .catch((err) => {
    console.log(err);
  });
