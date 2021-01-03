import { Component, OnInit } from '@angular/core';
import { User } from '../../modeli/User';
import { WebRequestService } from '../../storitve/web-request.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-nav',
  templateUrl: './profil-nav.component.html',
  styleUrls: ['./profil-nav.component.css']
})
export class ProfilNavComponent implements OnInit {

  uporabnik: User;
  loaded = false;
  stran = this.router.url;

  constructor(
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router
  ) { }

  public odjava(): void {
    this.avtentikacijaStoritev.odjava();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    if (this.jePrijavljen()) {
      this.vrniUporabnika();
    } else {
      this.router.navigateByUrl('/');
    }

  }

  public vrniUporabnika() {
    this.avtentikacijaStoritev.vrniPodatkeUporabnika().then((data) => {
      this.uporabnik = data;
      this.loaded = true;
    });
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }
}
