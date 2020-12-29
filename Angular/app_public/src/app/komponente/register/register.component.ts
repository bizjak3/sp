import { Component, Input, OnInit } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'
import { Router } from '@angular/router';
import { DataService} from '../../storitve/data.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public napakaNaObrazcu: string = "";

  

  constructor(private webReq: WebRequestService, 
    private router: Router, 
    private data: DataService,
    private avtentikacijaStoritev: AvtentikacijaService) { }

  

  public prijavniPodatki = {
    ime: "",
    priimek: "",
    email: "",
    geslo: "",
    geslo2: "",
  }

  ngOnInit(): void {
   
  }

  public posiljanjePodatkov(): void {
    this.napakaNaObrazcu = "";
    if (
      !this.prijavniPodatki.ime ||
      !this.prijavniPodatki.email ||
      !this.prijavniPodatki.geslo
    ) {
      this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
    } 

    if (this.prijavniPodatki.geslo != this.prijavniPodatki.geslo2) {
      this.napakaNaObrazcu = "Gesli se ne ujemata";
    }
     
    else {
      this.izvediRegistracijo();
    }
  }

  private izvediRegistracijo(): void {
    this.avtentikacijaStoritev
      .registracija(this.prijavniPodatki)
      .then(() => this.router.navigateByUrl("/login", {skipLocationChange: true}))
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }
}
