/**
 * Skapar händelselyssnare för sök-knappen.
 */

let search = document.getElementById("button");

search.addEventListener("click", searchLocation)

/**
 * Hämtar karta från Openstreetmap.
*/
const map = L.map('map').setView([63.8207873, 20.3240338], 10); // UMEÅ som startpunkt!

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

/**
 * Definerar markeringsfunktionen som används senare i searchLocation().
 */
let marker; 

/**
 * Funktion för att söka och visa plats med hjälp av Nominatin API.
 * 
 * @param {string} searchInput Användarens sökning.
 * @param {array} data Datan lagras från fetch.
 * @param {string} lat Plockar ut latitud från Data
 * @param {string} lon Plockar ut longitud från Data
 * @returns {map}
 */
async function searchLocation() {
    const searchInput = document.getElementById('search').value;

    try {
        // AJAX-anrop med Fetch på Nominatin API:et
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${(searchInput)}`);
        const data = await response.json();

        const lat = data[0].lat;
        const lon = data[0].lon;


        // Flyttar kartan till sökt plats via lat & lon. ZOOM sätts till 12.
        map.setView([lat, lon], 12);

        // Tar bort tidigare markör om det finns.
        if (marker) {
            map.removeLayer(marker);
        }

        // Lägger till en ny markör på kartan, dit användaren sökt.
        marker = L.marker([lat, lon]).addTo(map)

    } catch (error) {
        // Vid fel körs denna kodsnutt.
        console.error("Fel vid hämtning av plats:", error);
    }
}