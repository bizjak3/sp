import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './komponente/login/login.component';
import { RegisterComponent } from './komponente/register/register.component'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { NgxPaginationModule } from 'ngx-pagination'
import { ModalModule } from 'ngx-bootstrap/modal'
import { ServiceWorkerModule } from '@angular/service-worker'

import { AppComponent } from './app.component';
import { HomepageComponent } from './komponente/homepage/homepage.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './komponente/header/header.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { ProfilNavComponent } from './komponente/profil-nav/profil-nav.component';
import { UstvariTekmoComponent } from './komponente/ustvari-tekmo/ustvari-tekmo.component';
import { NastavitveComponent } from './komponente/nastavitve/nastavitve.component';
import { DbComponent } from './komponente/db/db.component';
import { UrediPodatkeComponent } from './komponente/uredi-podatke/uredi-podatke.component';
import { TekmaComponent } from './komponente/tekma/tekma.component';
import { MapComponent } from './komponente/map/map.component';
import { MojeTekmeComponent } from './komponente/moje-tekme/moje-tekme.component';
import { ModalOknoComponent } from './komponente/modal-okno/modal-okno.component';
import { NapakaComponent } from './komponente/napaka/napaka.component';
import { InfoUporabnikComponent } from './komponente/info-uporabnik/info-uporabnik.component';
import { OcenePipe } from './pipes/ocene.pipe';
import { DatumPipe } from './pipes/datum.pipe';
import { ZvezdicePipe } from './pipes/zvezdice.pipe';
import { environment } from '../environments/environment';
import {oceneTagPipe} from "./pipes/ocenaTag.pipe";
import {oceneTagTextPipe} from "./pipes/ocenaTagText.pipe";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    HeaderComponent,
    ProfilComponent,
    ProfilNavComponent,
    UstvariTekmoComponent,
    NastavitveComponent,
    DbComponent,
    UrediPodatkeComponent,
    TekmaComponent,
    MapComponent,
    MojeTekmeComponent,
    ModalOknoComponent,
    NapakaComponent,
    InfoUporabnikComponent,
    OcenePipe,
    DatumPipe,
    ZvezdicePipe,
    oceneTagPipe,
    oceneTagTextPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
