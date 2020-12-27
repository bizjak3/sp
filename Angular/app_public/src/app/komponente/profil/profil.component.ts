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

  user: any;
  uporabnik: any;
  mail: string;

  
  
  constructor(
    private data: DataService,
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService
    ) { }

  

  ngOnInit(): void {
    this.vrniUporabnika()
  }

  public vrniUporabnika() {
    var id = {
      id: this.avtentikacijaStoritev.vrniId()
    }
    this.web.getUporabnikById('/uporabnik', id).subscribe((user) => {
      this.uporabnik = user;
    })  
  }  

}
