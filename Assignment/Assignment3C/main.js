/*
    Author : Woojin Oh
    Date : Feb. 27, 2019
    Description : Assignment 3C - FLIGHT TRACKER
*/

(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    // L.marker([42, -60]).addTo(map)
    //     .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
    //     .openPopup();

    function loadFetch() {    
        fetch('https://opensky-network.org/api/states/all')
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                console.log('--------------------------------');
                console.log('Raw Data');
                console.log(json);

                var filteredJson = json.states.filter(x => x.includes('Canada') && x[5] !== null && x[6] !== null)
                                              .map(x => result = {"icao24": x[0], "callsign": x[1], "origin_country": x[2], "time_position": x[3], "last_contact": x[4], "longitude": x[5], "latitude": x[6], "geo_altitude": x[7], "on_ground": x[8], "velocity": x[9], "heading": x[10], "vertical_rate": x[11], "sensors": x[12], "baro_altitude": x[13], "squawk": x[14], "spi": x[15], "position_source": x[16]});
                console.log('--------------------------------');
                console.log('Filtered Data');
                console.log(filteredJson);

                var geojsonFeature = filteredJson.map(x => result = {
                    "type": "Feature",
                    "properties": {
                        "flightNumber": x.callsign,
                        "originCountry": x.origin_country,
                        "velocity": x.velocity
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [x.longitude, x.latitude],
                        "heading": x.heading
                    }
                });
                console.log('--------------------------------');
                console.log('GeoJSON Data');
                console.log(geojsonFeature);
                
                // https://gist.github.com/geog4046instructor/80ee78db60862ede74eacba220809b64
                // feature : Allows you to parse GeoJSON data 
                // var latlng = L.latLng(latitude, longitude)
                function createCustomIcon(geoJsonPoint, latlng) {
                    var myIcon = L.icon({
                        iconUrl: 'plane.png',
                        iconSize: [20, 20], // width and height of the image in pixels
                        iconAnchor: [10, 10],
                        popupAnchor: [0, 0]
                    })

                    return L.marker(latlng, { icon: myIcon, rotationAngle: geoJsonPoint.geometry.heading })
                            .bindPopup('Flight Number: ' + geoJsonPoint.properties.flightNumber + '<br>Origin Country: ' + geoJsonPoint.properties.originCountry + '<br>Velocity: ' + geoJsonPoint.properties.velocity + ' m/s').openPopup();
                }

                // create an options object that specifies which function will called on each feature
                var myLayerOptions = {
                    pointToLayer: createCustomIcon
                }
                
                var geoJsonLayer = L.geoJSON(geojsonFeature, myLayerOptions);
                geoJsonLayer.addTo(map);

                setTimeout(function() { map.removeLayer(geoJsonLayer); loadFetch();}, 7000);
            })
    }

    loadFetch();
   
})()