import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { WebRequestService } from '../../storitve/web-request.service'
import { Tekma } from '../../modeli/Tekma'

@Component({
  selector: 'app-tekma',
  templateUrl: './tekma.component.html',
  styleUrls: ['./tekma.component.css']
})
export class TekmaComponent implements OnInit {

  tekma: Tekma;
  

  tekma_ = new Tekma("", 0, 0, "", "", "", 0,0,0,"",[""], "", [""]);

  constructor(private route: ActivatedRoute, private webReq: WebRequestService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params.id)
        this.webReq.getTekma(params.id).subscribe((tekma: Tekma) => {
          this.tekma_ = tekma[0];
          
        })
      }
    ) 
  }

}
