import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Uporabnik } from '../../modeli/uporabnik'
import { Router} from '@angular/router'

@Component({
  selector: 'app-uredi-podatke',
  templateUrl: './uredi-podatke.component.html',
  styleUrls: ['./uredi-podatke.component.css']
})
export class UrediPodatkeComponent implements OnInit {

  uporabnik: any;
  mail: string;
  loaded = false;
  sprememba = false;
  napaka = "";

  sporocilo = ""

  public podatki = {
    ime: "",
    priimek: "",
    email: "",
    geslo: "",
    geslo2: "",
    telefon: 0,
    id: ""
  }

  constructor(
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    if (this.jePrijavljen()) {
      this.vrniUporabnika()
    } else {
      this.router.navigateByUrl("/")
    }
    
  }

  public vrniUporabnika() {
    this.avtentikacijaStoritev.vrniPodatkeUporabnika().then((data) => {
      this.uporabnik = data
      this.loaded = true
      this.podatki.ime = this.uporabnik.ime
      this.podatki.priimek = this.uporabnik.priimek;
      this.podatki.email = this.uporabnik.email;
      this.podatki.telefon = this.uporabnik.telefon;
      this.podatki.id = this.uporabnik._id;
    })
  }  

  spremeni() {

    if (this.podatki.geslo != this.podatki.geslo2) {
      this.napaka = "Gesli se ne ujemata"
    }
    else if (!this.podatki.ime || !this.podatki.priimek
      || !this.podatki.email || !this.podatki.geslo) {
        this.napaka = "Prosim vnesi vse potrebne podatke"
    } 
    else {
      this.web.spremeniUporabnika("/spremeni", this.podatki).subscribe()
      this.sprememba = true;
    }
  }

  public odjava(): void {
    this.avtentikacijaStoritev.odjava();
    this.router.navigateByUrl("/login", {skipLocationChange: true})
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }
}
