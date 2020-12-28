import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import * as geo from "esri-leaflet-geocoder"

const iconRetinaUrl = 'assets/images/marker-icon-2x.png';
const iconUrl = 'assets/images/marker-icon.png';
const shadowUrl = 'assets/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;

var geocodeService = geo.geocodeService();

@Component({
  selector: 'app-ustvari-tekmo',
  templateUrl: './ustvari-tekmo.component.html',
  styleUrls: ['./ustvari-tekmo.component.css']
})
export class UstvariTekmoComponent implements OnInit {
  private map;

  public podatki = {
    kraj: "",
    lng: "",
    lat: "",
    datum: "",
    ura: "",
    min: 0,
    max: 10,
    prijavljeni: 0,
    opombe: "Opombe"
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.050596, 14.506015],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var marker = null;

    this.map.on('click', e => {
      if (marker != null) {
        this.map.removeLayer(marker);
      }
      marker = new L.marker(e.latlng).addTo(this.map);
      geocodeService.reverse().latlng(e.latlng).run((error, result) => {
        this.podatki.kraj = result.address.Match_addr
        this.podatki.lat = e.latlng.lat
        this.podatki.lng = e.latlng.lng
      })
    })
  }


}
