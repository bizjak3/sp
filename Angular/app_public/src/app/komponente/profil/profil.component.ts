import { Component, OnInit } from '@angular/core';
import { User } from '../../modeli/User';
import { WebRequestService } from '../../storitve/web-request.service'
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { Uporabnik } from 'src/app/modeli/uporabnik';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  uporabnik: User;
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
    })
  }  

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

}
