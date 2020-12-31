import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Uporabnik } from '../modeli/uporabnik';
import { RezultatAvtentikacije } from './rezultat-avtentikacije';
import { SHRAMBA_BRSKALNIKA } from './shramba'

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  url = 'http://localhost:3000'

  constructor(
    private http: HttpClient,
    @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage
    ) { }

    httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('app-zeton')}`
      })
    };

    get(uri: string) {
      return this.http.get(this.url +  uri)
    }

    getTekma(id: string) {
      return this.http.get(this.url + "/tekma/" + id + "/tekme")
    }

    post(uri: string) {
      return this.http.post(this.url + uri, "", this.httpLastnosti)
    }

    postUser(uri: string, user: any) {
      return this.http.post(this.url + uri, user, this.httpLastnosti)
    }

    postTekma(uri: string, data: any) {
      return this.http.post(this.url + uri, data, this.httpLastnosti)
    }

    delete(uri: string) {
      return this.http.delete(this.url + uri);
    }

    updateUporabnik(uri: string, uporabnik: Uporabnik, novo: any) {
      return this.http.post(this.url + uri, {uporabnik, novo}, this.httpLastnosti)
    }

    public prijava(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
      return this.avtentikacija('prijava', uporabnik);
    }

    getPage(uri: string) {
      return this.http.get(this.url + uri);
    }

    public spremeniUporabnika(uri: string, uporabnik: any) {
      return this.http.post(this.url + uri, uporabnik, this.httpLastnosti)
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

    public spremeniTekmo(uri: string, tekma: any){
      return this.http.post(this.url + uri, tekma, this.httpLastnosti);
    }

    public prijaviSeNaTekmo(uri: string, body: any){
      return this.http.put(this.url + uri, body, this.httpLastnosti);
    }

    public odjaviSeOdTekme(uri: string, body: any){
      return this.http.put(this.url + uri, body, this.httpLastnosti);
    }

    public izbrisiTekmo(uri: string){
      return this.http.get(this.url + uri, this.httpLastnosti);
    }

    public oceniIgralce(uri: string, body: any){
      return this.http.post(this.url + uri, body, this.httpLastnosti);
    }

    public spremeniStatusTekme(uri: string, body: any){
      return this.http.put(this.url + uri, body);
    }
}
