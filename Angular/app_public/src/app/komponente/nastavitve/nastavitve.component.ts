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
  loaded = false

  constructor(
    private data: DataService,
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  ngOnInit(): void {
    this.vrniUporabnika()
  }

  public vrniUporabnika() {
    this.avtentikacijaStoritev.vrniPodatkeUporabnika().then((data) => {
      this.uporabnik = data
      this.loaded = true
    })
  }  

}
