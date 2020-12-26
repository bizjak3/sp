import { Component, OnInit } from '@angular/core';
import { User } from '../register/user';
import { DataService} from '../../storitve/data.service';
import { WebRequestService } from '../../storitve/web-request.service'
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Uporabnik } from '../../modeli/uporabnik'
import { UrediPodatkeComponent } from '../uredi-podatke/uredi-podatke.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User;
  uporabnik: any;
  mail: string;

  
  
  constructor(
    private data: DataService,
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService
    ) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(user => this.user = user)
    const uporabnik: Uporabnik = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    this.mail = uporabnik.email;

    this.web.getUporabnik("/prof", uporabnik).subscribe((uporabnik => {
      this.uporabnik = uporabnik;
      console.log(uporabnik)
    }))
  }

}
