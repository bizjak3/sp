import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from './shramba';
import { Uporabnik } from '../modeli/uporabnik';
import { RezultatAvtentikacije } from './rezultat-avtentikacije';
import { WebRequestService } from './web-request.service'


@Injectable({
  providedIn: 'root'
})

export class AvtentikacijaService {

  user: any;
  prova = "PROVA"

  a = this.vrniTrenutnegaUporabnika()

  constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage, private web: WebRequestService) { }

  private b64Utf8(niz: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(niz),
          (znak: string) => {
            return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  };

  public async prijava(uporabnik: Uporabnik): Promise<any> {
    return this.web
      .prijava(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"])
      });
  }

  public async registracija(uporabnik: Uporabnik): Promise<any> {
    return this.web
      .registracija(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        
      });
  }

  public odjava(): void {
    this.shramba.removeItem('app-zeton');
  }

  public vrniZeton(): string {
    return this.shramba.getItem('app-zeton');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('app-zeton', zeton);
  }

  public jePrijavljen(): boolean {
    const zeton: string = this.vrniZeton();
    if (zeton) {
      return true;
    } else {
      return false;
    }
  }

  public vrniPodatkeUporabnika() {
  
    var id = this.vrniId()
    
    return new Promise(resolve=>{
        this.web.get('/uporabnik/' + id)
         .subscribe(
            (data:any) => {
                resolve(data);
         })
      })
  }



  public vrniId() {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const {_id} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      
      var id = _id
      return id
    }
  }
  
  public vrniTrenutnegaUporabnika(): Uporabnik {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const {_id, elektronskiNaslov, ime, priimek} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      var email =  elektronskiNaslov
      var id = _id
      return {id, ime, email, priimek} as Uporabnik
    }
  }
}