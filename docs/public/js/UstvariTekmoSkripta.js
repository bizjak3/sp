

var UT_mapa = L.map('mapa_ustvari_div').setView([46.03, 14.9], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(UT_mapa);

var geocodeService = L.esri.Geocoding.geocodeService();

var marker_izbranaLokacija = null;

UT_mapa.on('click', function (e) {
    geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
        if (error) {
            return;
        }

        if (marker_izbranaLokacija != null) {
            UT_mapa.removeLayer(marker_izbranaLokacija);
        }


        marker_izbranaLokacija = new L.marker(result.latlng);
        UT_mapa.addLayer(marker_izbranaLokacija);
        var bbb = result.address.Match_addr //tle je shranjen string naslova
        document.getElementById("Input_Okno_Kraj").value = bbb;
        //console.log(bbb)
        var pozicija_LAT = e.latlng.lat;
        var pozicija_LNG = e.latlng.lng;
        //console.log(typeof(pozicija_LAT));
        //console.log(pozicija_LNG);
        document.getElementById("Input_Okno_LAT").value = pozicija_LAT;
        document.getElementById("Input_Okno_LNG").value = pozicija_LNG;


    });
});
