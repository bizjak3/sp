import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router' 
import { LoginComponent } from './komponente/login/login.component';
import { RegisterComponent } from './komponente/register/register.component'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'

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
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
