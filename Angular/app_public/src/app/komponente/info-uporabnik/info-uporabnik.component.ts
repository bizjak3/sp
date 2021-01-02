import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PodatkiTekme } from 'src/app/modeli/PodatkiTekme';
import { User } from 'src/app/modeli/User';
import { WebRequestService } from 'src/app/storitve/web-request.service';
import { convertTypeAcquisitionFromJson } from 'typescript';

@Component({
  selector: 'app-info-uporabnik',
  templateUrl: './info-uporabnik.component.html',
  styleUrls: ['./info-uporabnik.component.css']
})
export class InfoUporabnikComponent implements OnInit {

  uporabnik: any;
  loaded: boolean = false
  tekme: PodatkiTekme
  mail: boolean = true;
  telefon: boolean = true

  constructor(
    private route: ActivatedRoute,
    private web: WebRequestService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.web.get("/uporabnik/" + params.id).subscribe(
          result => {
            this.uporabnik = result;
            this.loaded = true;
            this.mail = this.uporabnik.emailDrugi;
            this.telefon = this.uporabnik.telDrugi;
            if (this.uporabnik.ocena == NaN) {
              this.uporabnik.ocena = "Ne ocenjen"
            }
            this.tekme = this.uporabnik.tekme
          }
        )
      }
    )
  }



}
