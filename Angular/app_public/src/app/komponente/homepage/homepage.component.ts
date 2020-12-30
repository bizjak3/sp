import { Component, OnInit, Input } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'
import { DataService} from '../../storitve/data.service';
import { AvtentikacijaService} from '../../storitve/avtentikacija.service'
import { Uporabnik } from '../../modeli/uporabnik'
import { Router } from '@angular/router';
import { convertTypeAcquisitionFromJson } from 'typescript';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  

  user: any;
  tekme: any;
  p: number;
  d: any;
  total: number;
  sort = -1;

  uporabnik: any;
  
  
  constructor( 
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router
  ) { }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  ngOnInit(): void {
    

    this.web.get("/tekme").subscribe((result) => {
      this.d = result;
      console.log(this.d)
      this.total = this.d.stevilo;
    })

    this.getTekme(1, this.sort)

    if (this.avtentikacijaStoritev.jePrijavljen()) {
      this.uporabnik = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    } 
    
  }

  getTekme(p: number, d: number) {
    console.log("AA")
    this.web.getPage("/page/" + p + "/" + d).subscribe((tekme) => {
      console.log("SEM PRSU DO SM")
      this.tekme = tekme
      console.log(this.tekme)
    })
  }

  getPage(pageNum: number) {
    this.p = pageNum
    this.getTekme(this.p, this.sort)
  }

  datumGor() {
    this.sort = -1;
    this.getTekme(this.p, this.sort)
  }

  datumDol() {
    this.sort = 1
    this.getTekme(this.p, this.sort)
  }

  
  

}
