import { Component, OnInit } from '@angular/core';
import { User } from '../register/user';
import { DataService} from '../../storitve/data.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { Uporabnik } from '../../modeli/uporabnik'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  mail: string;
  ime: string;
 

  constructor(private data: DataService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router) { }

  public odjava(): void {
    this.avtentikacijaStoritev.odjava();
    this.router.navigateByUrl("/login")
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(user => this.user = user)
    const uporabnik: Uporabnik = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    this.mail = uporabnik.email;
    this.ime = uporabnik.ime;
  }

  public vrniUporabnika(): string {
    const uporabnik: Uporabnik = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return uporabnik ? uporabnik.ime : 'Gost';
  }

  

  

}
