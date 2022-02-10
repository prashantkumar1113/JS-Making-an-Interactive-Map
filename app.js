// API's needed: Leaflet, Foursquare
// Need to output a dropdownlist and submit button
// Then draw the map with a user's geolocation
// And call the Foursquare API to draw pins
let map;

//get user location
async function getUserCoords() {
    let pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    //console.log([pos.coords.latitude, pos.coords.longitude]);
    return [pos.coords.latitude, pos.coords.longitude];
}

//create a map
function drawMarkers({ results }) {
    // let coords = await getUserCoords();
    results.forEach((marker) => {
        let long = marker.geocodes.main.longitude;
        let lat = marker.geocodes.main.latitude;
        let name = marker.name;
        //console.log(long, lat, name);
        let newMarker = L.marker([lat, long]);
        newMarker.addTo(map).bindPopup(`<p1><b>${name}</b></p1>`).openPopup();
    });
    //console.log(results);
}

//get info from the select list
const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", function () {
    let category = document.getElementById("shop-select-list").value;
    // console.log(shopValue);
    getFoursquareData(category);
});

async function getFoursquareData(category) {
    // Foursquare API Key fsq3wrRry/z2zhpM4YETMnpT0Qn+Zh/w9oRZy3UXWSw2krk=
    // Client Id
    // IDNMAAUK1M0CCKOKJYCBH1VJTC5YR2ULAH1F202T1A0GSCPC
    // Client Secret
    // 1F2LSI4EEZ4KJXHPY34A454U0P5G3405MDG1NVY2BLPQIWPU
    // const fetch = require("node-fetch");
    let coords = await getUserCoords();

    const url = `https://api.foursquare.com/v3/places/search?query=${category}&ll=${coords.toString()}`;
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: "fsq3wrRry/z2zhpM4YETMnpT0Qn+Zh/w9oRZy3UXWSw2krk=",
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => drawMarkers(json))
        .catch((err) => console.error("error:" + err));
}

// On load:
window.onload = async () => {
    const coords = await getUserCoords();
    // console.log(coords);
    map = L.map("map", {
        center: coords,
        zoom: 12,
    });
    // Add OpenStreetMap tiles:
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: "15",
    }).addTo(map);

    // Create and add a geolocation marker:
    const marker = L.marker(coords);
    marker.addTo(map).bindPopup("<p1><b>You are here</b></p1>").openPopup();
    // drawMap(coords);
};
