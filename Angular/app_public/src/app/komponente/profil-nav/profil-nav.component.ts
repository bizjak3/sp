import { Component, OnInit } from '@angular/core';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-nav',
  templateUrl: './profil-nav.component.html',
  styleUrls: ['./profil-nav.component.css']
})
export class ProfilNavComponent implements OnInit {

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router  
  ) { }

  public odjava(): void {
    this.avtentikacijaStoritev.odjava();
    this.router.navigateByUrl("/login")
  }

  ngOnInit(): void {
  }

}
