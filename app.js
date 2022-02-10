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

// On load:
window.onload = async () => {
    const coords = await getUserCoords();
    console.log(coords);
};
