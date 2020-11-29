

markerLAT = parseFloat(markerLAT);
markerLNG = parseFloat(markerLNG);

var tabelca = [markerLAT, markerLNG];



var mymap2 = L.map('mapa_popup_div').setView(tabelca, 10);

/* tle je nek k rabi token da je lepša mapa
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
*/



var layer1 = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
mymap2.addLayer(layer1); //dodamo layer na mapo

//napolni tabelo z markerji
//se napolne v hmpg.handlebars ze



/* za funkcijo če rabiš markerju nastavit custom atribut - recimo id da lahko identificiraš
//Handle marker click
var onMarkerClick = function(e){
    alert("You clicked on marker with customId: " +this.options.myCustomId);
}
//Create marker with custom attribute
var marker = L.marker([36.83711,-2.464459], {myCustomId: "abc123"});
marker.on('click', onMarkerClick);

*/
/*
function izvediDejanje(e) {
    var povezava = "/pop_up_tekma/" + this.options.myCustomId;
    location.href = povezava;
}
*/

L.marker(tabelca).addTo(mymap2);

