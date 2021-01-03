import { Component, OnInit } from '@angular/core';
import { WebRequestService } from 'src/app/storitve/web-request.service';
import { StructuredType } from 'typescript';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private web: WebRequestService
  ) { }

  niz: string;
  tabelaTekem: any;
  tabelaUporabnikov: any;
  result: any;

  ngOnInit(): void {
  }

  search() {
    this.web.search('/search/' + this.niz, null).subscribe(
      (result) => {
        this.result = result;
        this.tabelaTekem = this.result.tabelaTekem
        this.tabelaUporabnikov = this.result.tabelaUporabnikov
        console.log(this.result.tabelaUporabnikov)
      }
    )
  }

}
