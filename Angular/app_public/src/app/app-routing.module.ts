import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router' 
import { CommonModule } from '@angular/common';


import { LoginComponent } from './komponente/login/login.component';
import { RegisterComponent } from './komponente/register/register.component'
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
import { TekmaComponent } from './komponente/tekma/tekma.component'
import { MojeTekmeComponent } from './komponente/moje-tekme/moje-tekme.component';

const routes: Routes = [
  
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: '',
      component: HomepageComponent
    }, 
    {
      path: 'profil',
      component: ProfilComponent
    },
    {
      path: 'nav',
      component: ProfilNavComponent
    },
    {
      path: "ustvariTekmo",
      component: UstvariTekmoComponent
    },
    {
      path: "nastavitve",
      component: NastavitveComponent
    },
    {
      path: "db",
      component: DbComponent
    },
    {
      path: "uredi",
      component: UrediPodatkeComponent
    },
    {
      path: "tekma/:id",
      component: TekmaComponent
    },
    {
      path: "mojeTekme",
      component: MojeTekmeComponent
    }
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
