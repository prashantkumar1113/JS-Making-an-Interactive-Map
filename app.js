// API's needed: Leaflet, Foursquare
// Need to output a dropdownlist and submit button
// Then draw the map with a user's geolocation
// And call the Foursquare API to draw pins

//get user location
async function getUserCoords() {
    let pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    //console.log([pos.coords.latitude, pos.coords.longitude]);
    return [pos.coords.latitude, pos.coords.longitude];
}

//create a map
async function drawMap() {
    let coords = await getUserCoords();
    const map = L.map("map", {
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
}

// On load:
window.onload = async () => {
    //const coords = await getUserCoords();
    //console.log(coords);
    drawMap();
};
