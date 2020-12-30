import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-napaka',
  templateUrl: './napaka.component.html',
  styleUrls: ['./napaka.component.css']
})
export class NapakaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  vrni() {
    this.router.navigateByUrl("/")
  }

}
