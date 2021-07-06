const colors = ['#4d0ff1', '#6e0723', '#65202e', '#844aef', '#11a94c', '#5af68e', '#838452', '#1ac8cb', '#4e42e8', '#5d6eeb', '#0d3155', '#60d4d0', '#7ecdf3', '#d00cdd', '#af534b', '#fd1269', '#101ff8', '#9aa72c', '#cc5446', '#1a3ab7']

mapboxgl.accessToken = 'pk.eyJ1IjoiZWpoZW5yaXF1ZXMiLCJhIjoiY2txZTJldHl3MTV3bTJ0bjA0b3NyaDJzeSJ9.gjDkRBSPFBwi4rNvv6uTzg';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
});
map.resize();

var busMark = [];
async function run() {
    const locations = await getBusLocation();
    console.log(location);
    location.forEach(bus, i) => {
        var marker = new mapboxgl.marker({'color': colors[i] })
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .setPopup(new mapboxgl.Popup({offset: 25, closeOnClick: false, closeButton: false}).setHTML(`<h3>Bus ID <br>${bus.attributes.label}</h3>`))
        .addTo(map)
        .toogglePopup();
        busesMarkers.push(marker);
    });

    function deleteMark() {
        if (busMark!==null) {
            for (var i = busMark.length - 1; i >=0; i--) {
                busMark[i].remove();
            }
        }
    }
    locations.forEach((marker, i) => {
        let popUp = document.getElementsByClassName('mapboxgl-popup-content');
        popUp[i].style.background = colors[i];
    });
    setTimeout(deleteMark, 8000);
    setTimeout(run, 20000);
}

async function getBusLocation() {
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

map.on('load', function() {
    run();
});