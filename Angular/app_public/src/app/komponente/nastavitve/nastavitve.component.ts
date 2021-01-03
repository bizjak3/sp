import { Component, OnInit } from '@angular/core';
import { DataService} from '../../storitve/data.service';
import { WebRequestService } from '../../storitve/web-request.service'
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Uporabnik } from '../../modeli/uporabnik'
import { Router } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-nastavitve',
  templateUrl: './nastavitve.component.html',
  styleUrls: ['./nastavitve.component.css']
})
export class NastavitveComponent implements OnInit {

  uporabnik: any;
  mail: string;
  loaded = false
  vidiMail = true;
  vidiTel = true
  sporocilo: string
  result: any;
  status: string

  constructor(
    private data: DataService,
    private web: WebRequestService,
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router,
    private povezavaStoritev: PovezavaService
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
      this.vidiMail = this.uporabnik.emailDrugi
      this.vidiTel = this.uporabnik.telDrugi
    })
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  public submit() {
    let obj = {
      mail: this.vidiMail,
      tel: this.vidiTel
    }
    this.web.postUser("/zasebnost/" + this.avtentikacijaStoritev.vrniId(), obj).subscribe(

      result => {
        this.result = result;
        this.sporocilo = this.result.sporocilo
        this.status = this.result.status;
      },
      error => {
        this.result = error.error;
        this.sporocilo = this.result.sporocilo;
        this.status = this.result.status;
      }
    )
  }
  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }
}
