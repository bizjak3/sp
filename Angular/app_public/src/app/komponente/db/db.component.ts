import { Component, OnInit } from '@angular/core';
import { WebRequestService } from '../../storitve/web-request.service'

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  constructor(private webReq: WebRequestService) { }

  ngOnInit(): void {
  }

  vnesi() {
    this.webReq.post("/db").subscribe(
      data => console.log("Vneseni podatki"),
      error => console.log(error)
    )
  }

  vnesi30() {
    this.webReq.post("/db30").subscribe(
      data => console.log("Vneseni podatki"),
      error => console.log(error)
    )
  }

  izbrisi() {
    this.webReq.post("/db_izbrisi").subscribe(
      data => console.log("Izbrisani podatki"),
      error => console.log(error)
    )
  }

}
