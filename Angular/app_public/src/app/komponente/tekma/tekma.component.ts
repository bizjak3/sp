import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { WebRequestService } from '../../storitve/web-request.service'
import { Tekma } from '../../modeli/Tekma'
import * as L from "leaflet";

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

@Component({
  selector: 'app-tekma',
  templateUrl: './tekma.component.html',
  styleUrls: ['./tekma.component.css']
})
export class TekmaComponent implements OnInit {

  private map;

  tekma: any;
  igralci: any;
  loaded = false;
  


  constructor(private route: ActivatedRoute, private webReq: WebRequestService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params.id)
        this.webReq.getTekma(params.id).subscribe((tekma: Tekma) => {
          this.tekma = tekma[0];
          this.loaded = true;
          this.igralci = this.tekma.igralci
          this.initMap();
        })
      }
    ) 

    
      
    
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.tekma.lat, this.tekma.lng],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var marker = new L.marker([this.tekma.lat, this.tekma.lng]).addTo(this.map);
  }

}
