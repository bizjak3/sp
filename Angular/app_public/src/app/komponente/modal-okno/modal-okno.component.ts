import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { WebRequestService } from 'src/app/storitve/web-request.service';

@Component({
  selector: 'app-modal-okno',
  templateUrl: './modal-okno.component.html',
  styleUrls: ['./modal-okno.component.css']
})
export class ModalOknoComponent implements OnInit {

  public mail = "";
  status = "";
  poslano = false
  sporocilo = "";
  res: any;
  
  modalRef: BsModalRef;
  constructor(
    public bsModalRef: BsModalRef,
    private web: WebRequestService
    ) {}
 
  ngOnInit() {}

  public posljiMail() {
    var x = {
      mail: this.mail
    }
    this.web.postTekma("/pozabilGeslo", x).subscribe(
      result => {
        res: analyzeAndValidateNgModules;
        this.res = result;
        this.status = this.res.status
        this.sporocilo = this.res.sporocilo
      },
      error => {
        console.log(error)
        this.status = error.error.status
        console.log(this.status)
        this.sporocilo = error.error.sporocilo
        this.poslano = true;
      }
    )
  }

}
