import { Component, OnInit } from '@angular/core';
import { User } from '../register/user';
import { DataService} from '../../storitve/data.service';
import { WebRequestService } from '../../storitve/web-request.service'
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: any;
  uporabnik: any;
  mail: string;
  loaded = false;

  
  
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
      console.log(this.uporabnik)
    })
  }  

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

}
