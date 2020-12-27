import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../komponente/register/user'
import { Uporabnik } from '../modeli/uporabnik';
import { RezultatAvtentikacije } from './rezultat-avtentikacije';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  
  url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }
    get(uri: string) {
      return this.http.get(this.url +  uri)
    }

    getTekma(id: string) {
      return this.http.get(this.url + "/tekma/" + id + "/tekme")
    }

    post(uri: string) {
      return this.http.post(this.url + uri, "")
    }

    postUser(uri: string, user: User) {
      return this.http.post(this.url + uri, user)
    }

    delete(uri: string) {
      return this.http.delete(this.url + uri);
    }

    updateUporabnik(uri: string, uporabnik: Uporabnik, novo: any) {
      return this.http.post(this.url + uri, uporabnik, novo)
    }

    public prijava(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
      return this.avtentikacija('prijava', uporabnik);
    }
  
    public registracija(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
      return this.avtentikacija('registracija', uporabnik);
    }
  
    private avtentikacija(urlNaslov: string, uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
      const url: string = `${this.url}/${urlNaslov}`;
      return this.http
        .post(url, uporabnik)
        .toPromise()
        .then(rezultat => rezultat as RezultatAvtentikacije)
        .catch(this.obdelajNapako);
    }
    
    private obdelajNapako(napaka: any): Promise<any> {
      console.error('Prišlo je do napake', napaka.error["sporočilo"] || napaka.error.errmsg || napaka.message || napaka);
      return Promise.reject(napaka.error["sporočilo"]|| napaka.error.errmsg || napaka.message || napaka);
    }
      
}
