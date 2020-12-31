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

  tekma: Tekma;
  igralci: any;
  loaded = false;
  lahkoUrejamo = false;
  pridruzen = true;
  urejamo = false;
  ocenjamo = false;
  lahkoOcenjamo = true;
  lahkoPrijavimo = false;
  vreme: any;
  result: any;
  opisVremena: string;
  ikonaVremena: string;
  statusAdmin: boolean;

  public podatki = {
    datum: "",
    ura: "",
    opis: ""
  }
  public a = {
    ocene: []
  }


  constructor(private route: ActivatedRoute, private webReq: WebRequestService, private avtentikacija: AvtentikacijaService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {

        console.log(params.id)
        this.webReq.getTekma(params.id).subscribe((podatkiTekme: any) => {
          this.result = podatkiTekme
          this.tekma = this.result.tekma;
          this.igralci = this.tekma.igralci;

          this.vreme = this.result.vreme
          this.opisVremena = this.vreme.weather[0].description
          this.ikonaVremena = this.vreme.weather[0].icon

          this.loaded = true;
          this.pridruzen = false;

          // prijava
          this.igralci.forEach(element => {
            if(element.id + "" === this.avtentikacija.vrniId() + ""){
              this.pridruzen = true;
            }
          });

          // ocenjevanje
          if(this.tekma.zeOcenili.includes(this.avtentikacija.vrniId())){
            this.lahkoOcenjamo = false;
          }
          let i = this.tekma.igralci.map(a => a.id);
          if(!i.includes(this.avtentikacija.vrniId())){
            this.lahkoOcenjamo = false;
          }

          if(this.tekma.status == "prijave"){

            this.avtentikacija.vrniPodatkeUporabnika().then((res) => {
              this.result = res;
              this.statusAdmin = this.result.admin
              if (this.tekma.kreator.id == this.avtentikacija.vrniId() || this.statusAdmin){
                this.lahkoUrejamo = true;
              }
            })

            this.lahkoOcenjamo = false;
            this.lahkoPrijavimo = true;
          }

          this.urejamo = false;
          if (!this.map) {
            this.initMap();
          }

          if(this.checkTime()){
            console.log("here");
            this.spremeniStatus();
          }
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
    let upo = {
      id: this.avtentikacija.vrniId()
    }
    console.log(upo)
    this.webReq.prijaviSeNaTekmo("/prijaviSe/" + this.tekma._id, upo).subscribe((res) => {
      console.log(res)
      this.ngOnInit();
      this.pridruzen = true;
    });
  }

  odjaviSe(): void {
    let upo = {
      id: this.avtentikacija.vrniId()
    }
    this.webReq.odjaviSeOdTekme("/odjaviSe/" + this.tekma._id, upo).subscribe((result) => {
      this.ngOnInit()
      this.pridruzen = false;
    },
    error => console.log(error)
    );
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
    this.webReq.spremeniTekmo("/tekma/"+this.tekma._id+"/spremeniTekmo", this.podatki).subscribe(
      result => {
        console.log(result)
        this.ngOnInit()
      },
      error => console.log(error)

    );

    this.urejamo = false;
  }
  daOcenjevanje(): void {
    this.ocenjamo = true;
  }
  neOcenjevanje(): void {
    this.ocenjamo = false;
  }
  oceni(): void {
    let upo = this.avtentikacija.vrniId();
    this.webReq.oceniIgralce("/tekma/" + this.tekma._id + "/oceni/" + upo, this.a).subscribe(() => {
      this.ocenjamo = false;
      this.ngOnInit();
    });
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }

  checkTime(): boolean {
    let d = new Date();
    let dd = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

    if(dd >= this.tekma.datum){
      let t = d.getHours()+":"+d.getMinutes();
      if(t > this.tekma.ura){
        return true;
      }
    }
    return false;
  }

  spremeniStatus(): void {
    this.webReq.spremeniStatusTekme("/tekma/" + this.tekma._id + "/spremeniStatus", null).subscribe();
    if(this.pridruzen != false){
      this.lahkoOcenjamo = true;
    }
    this.lahkoPrijavimo = false;
  }
}
