import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
//import { EscolaService } from '../escola.service';
import { Escola } from '../escola';
import { map, filter } from "rxjs/operators";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as Api from "../api.service";

@Component({
  selector: 'app-escola',
  templateUrl: './escola.component.html',
  styleUrls: ['./escola.component.css']
})
export class EscolaComponent implements OnInit {

  closeResult = '';
  dataSaved = false;  
  escolaForm: any;  
  allEscolas: Escola[];  
  escolaIdUpdate = null;  
  message = null;  

  @Input() name;

  
  @Input() searchText:string = '';

  constructor(
    private formbulider: FormBuilder, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadAllEscolas();
    this.escolaForm = this.formbulider.group({
      nome:    ['', [Validators.required, Validators.maxLength(50)]],  
      contato: ['', [Validators.required, Validators.maxLength(14), Validators.minLength(14)]],
      diretor: ['', [Validators.required, Validators.maxLength(50)]],
      local:   ['', [Validators.required, Validators.maxLength(100)]] 
    });
  }

  onSubmit() {
      this.createEscola(this.escolaForm.value);
  }
  

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  loadAllEscolas(){
    Api.getAllEscola().then((escolas)=>{
      this.allEscolas = escolas;
    });
  }

  onFormSubmit(){
    this.dataSaved = false;
    const escola = this.escolaForm.value;
    this.createEscola(escola);
    this.escolaForm.reset();
  }

  createEscola(escola: Escola){
    if(this.escolaIdUpdate == null){
      Api.createEscola(escola).then((data)=>{
        this.savedCallback();
      });
    }else{
      escola.id = this.escolaIdUpdate;
      Api.updateEscola(this.escolaIdUpdate, escola).then((data)=>{
        this.updatedCallback();
      });
    }
  }

  loadEscolaToEdit(id: number, content: any){
    Api.getEscolaById(id).then((escola)=>{
      this.escolaIdUpdate = id;
      this.escolaForm.controls['nome'].setValue(escola.nome);
      this.escolaForm.controls['contato'].setValue(escola.contato);
      this.escolaForm.controls['diretor'].setValue(escola.diretor);
      this.escolaForm.controls['local'].setValue(escola.local); 
      this.open(content); 
    });
  }

  deleteEscola(id: number){
    if(confirm("Deseja realmente excluir a escola?")){
      Api.deleteEscola(id).then((data)=>{
        this.deletedCallback();
      });
    }
  }

  resetForm(){
    this.escolaForm.reset();
    this.message = null;
    this.dataSaved = false;
  }

  savedCallback(){
    this.callbackState("Registro incluído com sucesso!");
  }

  updatedCallback(){
    this.callbackState("Registro atualizado com sucesso!");
  }

  deletedCallback(){
    this.callbackState("Registro excluído com sucesso!");
  }

  callbackState(message: string){
    this.dataSaved = true;
    this.message = message;
    this.loadAllEscolas();
    this.escolaIdUpdate = null;
    this.escolaForm.reset();
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
