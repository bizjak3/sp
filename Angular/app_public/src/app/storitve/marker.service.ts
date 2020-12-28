import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebRequestService } from '../storitve/web-request.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})

export class MarkerService {

  tekme: any;

  constructor(
    private web: WebRequestService,
    private router: Router
    ) {}

  public onClick() {
    console.log("CLICK")
    this.router.navigateByUrl("/login")
  }

  makeCapitalMarkers(map: L.map): void {

    this.web.get("/tekme").subscribe((result) => {
      this.tekme = result;

      for (let i = 0; i < this.tekme.length; i++) {
        var lat = this.tekme[i].lat
        var lng = this.tekme[i].lng
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(
          `<div>Kraj: ${ this.tekme[i].kraj }</div>` +
          `<div>Datum:  ${ this.tekme[i].datum }</div>` + 
          `<div>Ura:  ${ this.tekme[i].ura }</div>`
        );
        marker.on('mouseover', function (e) {
          this.openPopup();
        });
        marker.on('mouseout', function (e) {
          this.closePopup();
        });

        marker.on("click", e => {
          this.router.navigateByUrl("/tekma/" + this.tekme[i]._id);
        });
      }
    })
  }

  


}