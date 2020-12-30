import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { WebRequestService } from '../../storitve/web-request.service'
import { AvtentikacijaService } from 'src/app/storitve/avtentikacija.service';
import { Tekma } from '../../modeli/Tekma'
import { Router} from '@angular/router'
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
  lahkoUrejamo = true;
  pridruzen = true;
  urejamo = false;

  public podatki = {
    datum: "",
    ura: "",
    opis: ""
  }


  constructor(private route: ActivatedRoute, private webReq: WebRequestService, private avtentikacija: AvtentikacijaService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params.id)
        this.webReq.getTekma(params.id).subscribe((tekma: Tekma) => {
          this.tekma = tekma[0];
          this.loaded = true;
          this.igralci = this.tekma.igralci;

          this.pridruzen = false;

          this.igralci.forEach(element => {
            if(element.id + "" === this.avtentikacija.vrniId() + ""){
              this.pridruzen = true;
            }
          });

          this.lahkoUrejamo = true;
          this.urejamo = false;
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

  pridruziSe(): void {
    this.pridruzen = true;
    let upo = this.avtentikacija.vrniId();
    this.webReq.prijaviSeNaTekmo("/tekma/" + this.tekma._id + "/prijaviSe/" + upo, null).subscribe(() => {
      this.ngOnInit();
    });
  }
  odjaviSe(): void {
    this.pridruzen = false;
    let upo = this.avtentikacija.vrniId();
    this.webReq.odjaviSeOdTekme("/tekma/" + this.tekma._id + "/odjaviSe/" + upo, null).subscribe(() => {
      this.ngOnInit();
    });
  }
  jaUrejamo(): void {
    this.urejamo = true;
  }
  neUrejamo(): void {
    this.urejamo = false;
  }
  izbrisi(): void {
    this.webReq.izbrisiTekmo("/tekma/" + this.tekma._id + "/izbrisi").subscribe();
    this.router.navigateByUrl("/");
  }
  spremeni(): void {
    this.webReq.spremeniTekmo("/tekma/"+this.tekma._id+"/spremeniTekmo", this.podatki).subscribe(() => {
      this.ngOnInit()
    });
    this.urejamo = false;
  }
}
