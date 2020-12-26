import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'
import { Router } from '@angular/router';
import { DataService} from '../../storitve/data.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      !this.prijavniPodatki.email ||
      !this.prijavniPodatki.geslo
    ) {
      this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
    } 
     
    else {
      this.izvediPrijavo();
    }
  }

  private izvediPrijavo(): void {
    this.avtentikacijaStoritev
      .prijava(this.prijavniPodatki)
      .then(() => this.router.navigateByUrl("/"))
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }

}
