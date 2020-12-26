import { Component, OnInit, Input } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'
import { User } from '../register/user';
import { DataService} from '../../storitve/data.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service'
import { Uporabnik } from '../../modeli/uporabnik'
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  

  user: User;

  d: any;
  uporab: any;
  constructor(private tekme: WebRequestService, 
    private data: DataService, 
    private uporabnik: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router
  ) { }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  public vrniUporabnika(): string {
    const uporabnik: Uporabnik = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return uporabnik ? uporabnik.ime : 'Gost';
  }

  ngOnInit() {

    if (!this.jePrijavljen()) {
      this.router.navigateByUrl("/login")
    }
  
    this.data.currentMessage.subscribe(user => this.user = user)
    this.tekme.get("/tekme").subscribe((result) => {
      this.d = result;
    })

    this.uporabnik.get("/user").subscribe((result) => {
      this.uporab = result;
    })
    

    

    
    
    
  }

  
  

}
