import { Component, OnInit, Input } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'
import { User } from '../../modeli/User';
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
  
  

  user: any;
  tekme: any;
  
  constructor(
    private data: DataService, 
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router
  ) { }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

 

  ngOnInit(): void {

    if (!this.avtentikacijaStoritev.jePrijavljen()) {
      this.router.navigateByUrl("/login")
    } 
    else {
      this.user = this.avtentikacijaStoritev.vrniUporabnikaPrekoId()
      
      this.web.get("/tekme").subscribe((result) => {
        this.tekme = result;
     })
    }
    

      
    
  }

  
  

}
