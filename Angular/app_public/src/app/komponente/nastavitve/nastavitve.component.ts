import { Component, OnInit } from '@angular/core';
import { DataService} from '../../storitve/data.service';
import { WebRequestService } from '../../storitve/web-request.service'
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Uporabnik } from '../../modeli/uporabnik'

@Component({
  selector: 'app-nastavitve',
  templateUrl: './nastavitve.component.html',
  styleUrls: ['./nastavitve.component.css']
})
export class NastavitveComponent implements OnInit {

  uporabnik: any;
  mail: string;

  constructor(
    private data: DataService,
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  ngOnInit(): void {
    const uporabnik: Uporabnik = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    this.mail = uporabnik.email;

    this.web.getUporabnik("/prof", uporabnik).subscribe((uporabnik => {
      this.uporabnik = uporabnik;
      console.log(uporabnik)
    }))
  }

}
