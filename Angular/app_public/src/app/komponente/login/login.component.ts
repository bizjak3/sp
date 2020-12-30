import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'
import { Router } from '@angular/router';
import { DataService} from '../../storitve/data.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalOknoComponent } from '../modal-okno/modal-okno.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public napakaNaObrazcu: string = "";
  bsModalRef: BsModalRef;

  

  constructor(
    private modalService: BsModalService,
    private webReq: WebRequestService, 
    private router: Router, 
    private data: DataService,
    private avtentikacijaStoritev: AvtentikacijaService) { }

  

  public prijavniPodatki = {
    id: "",
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

  public openModalWithComponent() {
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(ModalOknoComponent);
  }

}
