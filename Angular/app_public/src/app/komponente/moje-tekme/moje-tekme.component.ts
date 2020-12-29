import { Component, OnInit } from '@angular/core';
import { PodatkiTekme } from 'src/app/modeli/PodatkiTekme';
import { AvtentikacijaService } from 'src/app/storitve/avtentikacija.service';

@Component({
  selector: 'app-moje-tekme',
  templateUrl: './moje-tekme.component.html',
  styleUrls: ['./moje-tekme.component.css']
})
export class MojeTekmeComponent implements OnInit {

  uporabnik: any;
  loaded = false;
  tekme: [PodatkiTekme];

  niTekem = true;

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  ngOnInit(): void {
    this.vrniUporabnika()
  }

  public vrniUporabnika() {
    this.avtentikacijaStoritev.vrniPodatkeUporabnika().then((data) => {
      this.uporabnik = data
      this.tekme = this.uporabnik.tekme
      this.loaded = true
      console.log(this.tekme)
      if (this.tekme.length > 0) {
        this.niTekem = false;
      }
    })
  }  

}
