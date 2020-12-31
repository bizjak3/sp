import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PodatkiTekme } from 'src/app/modeli/PodatkiTekme';
import { User } from 'src/app/modeli/User';
import { WebRequestService } from 'src/app/storitve/web-request.service';

@Component({
  selector: 'app-info-uporabnik',
  templateUrl: './info-uporabnik.component.html',
  styleUrls: ['./info-uporabnik.component.css']
})
export class InfoUporabnikComponent implements OnInit {

  uporabnik: any;
  loaded: boolean = false
  tekme: PodatkiTekme

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
            if (this.uporabnik.ocena == 0) {
              this.uporabnik.ocena = "Ne ocenjen"
            }
            this.tekme = this.uporabnik.tekme
          }
        )
      }
    )
  }



}
