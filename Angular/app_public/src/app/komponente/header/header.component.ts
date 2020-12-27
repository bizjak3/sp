import { Component, OnInit } from '@angular/core';
import { User } from '../register/user';
import { DataService} from '../../storitve/data.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { Uporabnik } from '../../modeli/uporabnik'
import { WebRequestService } from '../../storitve/web-request.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uporabnik: any;
  ime: string;
  priimek: string;
  loaded = false;
 

  constructor(
    private web: WebRequestService,
    private data: DataService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router) { }

  public odjava(): void {
    this.avtentikacijaStoritev.odjava();
    window.location.reload();
  }

  ngOnInit(): void {
    if (this.jePrijavljen()) {
      this.vrniUporabnika()
    } 
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  public vrniUporabnika() {
    var id = {
      id: this.avtentikacijaStoritev.vrniId()
    }
    this.web.getUporabnikById('/uporabnik', id).subscribe((user) => {
      this.loaded = true;
      this.uporabnik = user;
    })  
  }  

}
